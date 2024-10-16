﻿using AutoMapper;
using DatingApp.DTOs;
using DatingApp.Models;
using DatingApp.Services;
using System.Linq;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest=>dest.PhotoUrl, opt=>opt.MapFrom(src=>
                src.Photos.FirstOrDefault(x=> x.IsMain).Url))
                .ForMember(dest=>dest.Age, opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
        }
    }
}
