namespace ImageDesign.API.Models
{
    public class UserPostModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; } // שם פרטי
        public string LastName { get; set; } // שם משפחה
        public string Email { get; set; } // דוא"ל
        public string Password { get; set; } // סיסמה
        public string Role { get; set; } // תפקיד
        public string PhoneNumber { get; set; } // מספר טלפון
    }
}
