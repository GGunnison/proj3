QUnit.asyncTest("testing Login", function(assert){
	expect(1);

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/users/login",
		data: {'username':'Grant', 'password': 'hello'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, 'Grant' );
			QUnit.start();
		}
	});
});

QUnit.asyncTest('add new user', function(assert){

	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': "Grant", "password": "hello", "displayname": "Grant",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);

			$.ajax({
				type: "POST",
				url: "http://localhost:3000/users/login",
				data: {'username':'Grant', 'password': 'hello'},
				success: function(obj){
					var res = JSON.parse(obj);
					assert.equal(res.content.username, 'Grant' );
					QUnit.start();
				}
			});
		}
	});
});
