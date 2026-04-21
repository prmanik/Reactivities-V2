using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationExceptionAsync(context, ex);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var appException = env.IsDevelopment()
        ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
         : new AppException(context.Response.StatusCode, ex.Message);

        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        await context.Response.WriteAsync(JsonSerializer.Serialize(appException, jsonOptions));
    }

    private async Task HandleValidationExceptionAsync(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();
        foreach (var error in ex.Errors)
        {
            if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
            {
                validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
            }
            else
            {
                validationErrors[error.PropertyName] = [error.ErrorMessage];
            }
        }
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = context.Response.StatusCode,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors occurred."
        };
        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
