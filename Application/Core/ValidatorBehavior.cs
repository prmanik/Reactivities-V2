using System;
using System.Data.Common;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidatorBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
: IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator is null) return await next();
        var validatorResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validatorResult.IsValid)
        {
            throw new ValidationException(validatorResult.Errors);
        }
        return await next();
    }
}
