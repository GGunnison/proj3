
// DO NOT DELETE THIS TEST!!!
//when no liftid is specified, a random one is generated and added to the DB
// QUnit.asyncTest("testing add lift without specified liftID", function(assert){
// 	var exerciseID = '5447362295a004581b378ef8';

// 	expect(1);

// 	$.ajax({
// 		type: "POST",
// 		url: "http://localhost:3000/workout/addlift",
// 		data: {'parentExercise' : exerciseID,'liftname' : 'Squat','sets': '5','reps' : '5','weight' : '200'},
// 		success: function(obj){
// 			assert.equal(1,1, "Successful add");
// 			QUnit.start();
// 		}
// 	});
// });

//liftid is specified
// QUnit.asyncTest("testing add lift with specified liftID", function(assert){
// 	var exerciseID = '5447362295a004581b378ef8';

// 	expect(1);

// 	$.ajax({
// 		type: "POST",
// 		url: "http://localhost:3000/workout/addlift",
// 		data: {'liftid' : '5447362295a123451b378ef7', 'parentExercise' : exerciseID,'liftname' : 'Squat','sets': '5','reps' : '5','weight' : '200'},
// 		success: function(obj){
// 			assert.equal(1,1, "Successful specified add");
// 			QUnit.start();
// 		}
// 	});
// });

// //the specified liftid is used here to delete the lift from the DB
// // deletes the lift that we added in the test above
// QUnit.asyncTest("testing delete the specified liftID", function(assert){
// 	var liftID = '5447362295a123451b378ef7';
// 	expect(1);

// 	$.ajax({
// 		type: "DELETE",
// 		url: "http://localhost:3000/workout/deletelift",
// 		data: {'liftID':liftID},
// 		success: function(obj){
// 			assert.equal(1,1, "Successful delete");
// 			QUnit.start();
// 		}
// 	});
// });

QUnit.asyncTest("testing workout workflow", function(assert){
	
	//ADD USER
	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': 'Jill', "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, 'Jill');
			console.log('after first ajax call');

			//LOGIN
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/users/login",
				data: {'username': 'Jill', 'password': 'mountains'},
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
								url: "http://localhost:3000/users/" + 'Jill',
								data: {'username':'Jill'},
								success: function(obj){
									var res = JSON.parse(obj);
									console.log('returned from delete call');
									//deleting user also calls the workout delete method
									//so no point in writing a separate test - it's covered here
									assert.equal(1,1, "Successful delete"); 
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


