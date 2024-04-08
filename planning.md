# Voting app


- Models
- Routes

# voting app functionality
    1. user signIn / login
    2. see the list of candidates
    3. can vote one candidate only
    4. route where live count sorted by thier votes
    5. user data must contain a unique id proof : aadhar card
    6. admin who can maintain candidates or voter
    7. password change
    8. login with aadhar card and password


--------------------------------------------------------------------------

# Routes

    1. User Authentication:
        /signUp: POST - create a new user
        /signIn: POST - Login to an existing account
    
    2. Voting:
        /candidates: GET - Get list of candidates
        /vote/:candidateId: POST - Vote for a specific candidate
    
    3. Vote count:
        /vote/counts: GET - Get list of candidates sorted by vote counts
    
    4. User profile:
        /profile: GET - Get the user's profile
        /profile/password: PUT - change user;s password
    
    5. Admin:
        /candidates: POST - create a new candidate
        /candidate/:candidateId: PUT - update an existing candidate
        /candidate/:candidateId: DELETE - delete a candidate