export const loginSuccess = async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User Logged In", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
};

// export const handleGoogleCallback = (req, res) => {
//   // Ensure req.authData exists before destructuring
//   if (!req.authData || !req.authData.user) {
//     return res.status(401).json({ message: "Authentication failed" });
//   }
//   const { user, token } = req.authData;
//   // Ensure googleSignup has a default value

//   console.log("user, token", user, token)

//   const userData = {
//     ...user,
//     isAuthenticated: true,
//     googleSignup: user.googleSignup !== undefined ? user.googleSignup : true,
//   };
//   res.redirect("http://localhost:5173"); // Redirect to the frontend after login

//   // Send token and user data in response
//   return res.status(200).send({
//     message: "Login successful",
//     token, // Send token in response instead of cookies
//     user: userData,
//   });
// };

export const handleGoogleCallback = (req, res) => {
  const { user, token } = req.authData;
const userData = {
  ...user,
  'isAuthenticated': true
}
  if (!user) {
    return res.redirect("http://localhost:5173/login");
  }

  if (user.googleSignup) {
    res.cookie('token', token, {
      httpOnly: false,
      secure: false,      // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    })
    res.cookie('user',
      {
        ...user,
        'isAuthenticated': true
      },
      {
        httpOnly: false,
        secure: false,      // Set to true in production with HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
      }
    )
    return res.redirect(`http://localhost:5173`)
  } else {
    res.cookie('token', token, {
      httpOnly: false,
      secure: false,      // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    })
    res.cookie('user',
      userData,
      {
        httpOnly: false,
        secure: false,      // Set to true in production with HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
      }
    )
    return res.redirect(`http://localhost:5173`);
  }
};

export const handleLogout = (req, res) => {
  res.redirect("http://localhost:5173");
};
