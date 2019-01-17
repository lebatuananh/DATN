﻿using ShoppingOnline.Application.ECommerce.Products.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShoppignOnline.Application.Dapper.Interfaces
{
    public interface IColorDapperService
    {
        IEnumerable<ColorViewModel> GetColors(int productId);

    }
}
