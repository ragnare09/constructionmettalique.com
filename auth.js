// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Firebase UI Config
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in
            // Redirect to dashboard or home page
            window.location.href = 'dashboard.html';
            return false; // Don't redirect automatically
        },
        uiShown: function() {
            // The widget is rendered
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'dashboard.html',
    signInOptions: [{
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account'
            }
        },
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ],
    // Terms of service url
    tosUrl: 'terms.html',
    // Privacy policy url
    privacyPolicyUrl: 'privacy.html'
};

// Start the Firebase UI widget
ui.start('#firebaseui-auth-container', uiConfig);

// Email/Password Login
document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Set persistence based on remember me
    const persistence = rememberMe ?
        firebase.auth.Auth.Persistence.LOCAL :
        firebase.auth.Auth.Persistence.SESSION;

    firebase.auth().setPersistence(persistence)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            // Signed in
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Show error to user
            alert(errorMessage);
        });
});

// Auth State Listener (for all pages)
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is logged in:", user.email);

        // You can add user info to navbar or perform other actions
    } else {
        // User is signed out
        console.log("User is signed out");
    }
});

// Logout Function (can be used on any page)
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful
        window.location.href = 'index.html';
    }).catch((error) => {
        // An error happened
        console.error(error);
    });
}