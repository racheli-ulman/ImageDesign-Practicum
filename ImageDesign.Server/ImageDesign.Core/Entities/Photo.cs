﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageDesign.Core.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PhotoName { get; set; }
        public int? AlbumId { get; set; }
        public string PhotoPath { get; set; }
        public int PhotoSize { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public virtual User? User { get; set; }

        public virtual ICollection<Album> Albums { get; set; } = new List<Album>();

        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
