using System;

namespace Application.Core;

public class AppException(int code, string message, string? details = null)
{
    public int StatusCode { get; set; } = code;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
