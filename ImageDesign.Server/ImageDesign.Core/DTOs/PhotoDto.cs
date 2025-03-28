﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PhotoName { get; set; }
        public int? AlbumId { get; set; }
        public string PhotoPath { get; set; }
        public int PhotoSize { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
