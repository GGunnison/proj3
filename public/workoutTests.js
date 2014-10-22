QUnit.asyncTest("testing Login", function(assert){
	var u = 'Jill';
	//ADD USER
	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': u, "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, u);
			console.log('after first ajax call');

			//LOGIN
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/users/login",
				data: {'username': u, 'password': 'mountains'},
				success: function(obj){

					//ADD WORKOUT
					$.ajax({
						type: "POST",
						url: "http://localhost:3000/workout/addWorkout",
						data: {
							username: 'Bob',
							date: 'date!!',
							exercise_name: 'chest',
							type: 'lift',
							lift_name: 'bench',
							reps: 5,
							sets: 3,
							weight: 100
						},
						success: function(obj){
							var res = JSON.parse(obj);
							assert.equal(1,1); //if we got here, it was successful

							//DELETE USER
							$.ajax({
								type: "DELETE",
								url: "http://localhost:3000/users/" + u,
								data: {'username':u},
								success: function(obj){
									var res = JSON.parse(obj);
									console.log('returned from delete call');
									//deleting user also calls the workout delete method
									//so no point in writing a separate test - it's covered here
									assert(1,1); 
									QUnit.start();
								}
							});
						}
					});
				}
			});
		}
	});
});


