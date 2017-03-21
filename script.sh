# GET /api/dept/:department/suggested
read -p $'\nSuggested courses for a department:'
curl -X "GET" "http://localhost:3000/api/dept/Computer%20Science/suggested" 

# GET /api/dept/:department/allCourses
read -p $'\nAll courses for a department:'
curl -X "GET" "http://localhost:3000/api/dept/Computer%20Science/allCourses" 

# GET /api/courses/:courseCode
read -p $'\nA course:'
curl -X "GET" "http://localhost:3000/api/courses/CSC309"

# POST /api/user/register
read -p $'\nRegister a user:'
curl -X "POST" "http://localhost:3000/api/user/register"\
	-H "Content-Type: application/json; charset=utf-8"\
	-d $'{
			"email" : "test@test",
			"password" : "test",
			"department1" : "Computer Science",
			"faculty" : "Faculty of Arts and Sciences"
		}'

# POST /api/user/login
read -p $'\nUser login:'
curl -X "POST" "http://localhost:3000/api/user/login"\
		-H "Content-Type: application/json; charset=utf-8"\
		-d $'{
			"email" : "test@test",
			"password" : "test"
		}'

# PUT /api/user/updateInfo
read -p $'\nUpdate user info:'
curl -X "PUT" "http://localhost:3000/api/user/updateInfo"\
		-H "Content-Type: application/json; charset=utf-8"\
		-d $'{
			"email" : "test2"
		}'

# POST /api/courses/:courseCode/addRating
read -p $'\nPost rating'
curl -X "POST" "http://localhost:3000/api/courses/CSC309/addRating"\
		-H "Content-Type: application/json; charset=utf-8"\
		-d $'{
			"difficulty" : "5",
			"workload" : "5",
			"learningExp" : "5",
			"overall" : "5",
			"comment" : "Great course.",
		}'

# GET /api/courses/:courseCode/getRatings
read -p $'\nRatings for course:'
curl -X "GET" "http://localhost:3000/api/courses/CSC309/getRatings" 

# GET /api/search/:query
read -p $'\nSearch:'
curl -X "GET" "http://localhost:3000/api/search/computer" 

# GET /api/user/suggested
read -p $'\nSuggested courses for a user:'
curl -X "GET" "http://localhost:3000/api/user/suggested" 

# GET /api/user/history
read -p $'\nGet user viewing history:'
curl -X "GET" "http://localhost:3000/api/user/history" 

# GET /api/user/rated
read -p $'\nRatings submitted by user:'
curl -X "GET" "http://localhost:3000/api/user/rated" 

# GET /api/faculties/all
read -p $'\nAll faculties:'
curl -X "GET" "http://localhost:3000/api/faculties/all" 

# GET /api/dept/all
read -p $'\nAll departments:'
curl -X "GET" "http://localhost:3000/api/dept/all" 

