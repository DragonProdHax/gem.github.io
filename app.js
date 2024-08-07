// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNxVVnHpffnSiBf01D8-KFkX4aAOZedbk",
    authDomain: "mini-brawl-stars-jump.firebaseapp.com",
    databaseURL: "https://mini-brawl-stars-jump-default-rtdb.firebaseio.com",
    projectId: "mini-brawl-stars-jump",
    storageBucket: "mini-brawl-stars-jump.appspot.com",
    messagingSenderId: "303460545096",
    appId: "1:303460545096:web:642af8c1d3572666545e7d",
    measurementId: "G-YK0Y84BHQE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Database
const database = firebase.database();

// Function to generate a valid user ID
function generateUserId() {
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    const letters = Array.from({ length: 9 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
    return digits + letters; // Remove the period and use only digits and letters
}

// Function to update user info on the screen
function updateUserInfo(userId, gems) {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `User ID: ${userId} <br> Gems: ${gems}`;
}

// Create or Update user in Firebase
function createOrUpdateUser() {
    const userId = generateUserId();
    const userRef = database.ref('users/' + userId);

    // Set initial data for the new user
    userRef.set({
        gems: 10
    }).catch((error) => {
        console.error('Error setting initial data:', error);
    });

    // Fetch data and update every second
    setInterval(() => {
        userRef.once('value').then(snapshot => {
            const data = snapshot.val();
            if (data && data.gems !== undefined) {
                updateUserInfo(userId, data.gems);
            } else {
                console.error('Data not found or invalid:', data);
            }
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, 1000);
}

// Initialize the user data display
createOrUpdateUser();
