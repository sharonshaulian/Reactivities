using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T,string> ruleBuilder) 
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("password must contain at least 6 characters.")
                .Matches("[A-Z]").WithMessage("password must contain 1 uppercase letter.")
                .Matches("[a-z]").WithMessage("password must contain 1 lowercase letter.")
                .Matches("[0-9]").WithMessage("password must contain 1 number.")
                .Matches("[^A-Za-z0-9]").WithMessage("password must contain 1 non alphanumeric.");

            return options;
        }
    }
}
