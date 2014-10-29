(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"register\">\n		<h1>Register</h1>\n		</div>\n		<form id=\"register-form\">\n			<div>Username: <input type=\"text\" name=\"username\" required /></div>\n			<div>Weight: <input type=\"number\" name=\"weight\" required /></div>\n			<div>Age: <input type=\"Number\" name=\"age\" required /></div>\n			<div>Password: <input type=\"password\" name=\"password\" required /></div>\n			<div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n			<input type=\"submit\"/>\n		</form>\n	</div>\n\n\n	<div id=\"signin\">\n		<h1>Sign in</h1>\n		<form id=\"signin-form\" action=\"/login\" method=\"post\">\n			<div>Username: <input type=\"text\" name=\"username\" required /></div>\n			<div>Password: <input type=\"password\" name=\"password\" required /></div>\n			<input type=\"submit\" />\n		</form>\n	</div>";
  },"useData":true});
templates['userPage'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"addWorkout-template\">	\n	<button id=\"addWorkoutButton\" type=\"button\">Add Workout</button>\n	<div id=\"addWorkoutPopup\" class=\"hidden\">\n		<form id=\"addWorkoutForm\">\n			Date: <input type=\"date\" name=\"date\" required><br>\n			<input type=\"submit\" />\n		</form>\n	</div>\n</div>\n\n<div id=\"workoutDetails-template\">\n	\n	<span class=\"meta\">Workout ("
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + ")</span>\n	<button id=\"editWorkoutButton\" type=\"button\">Edit</button>\n	<button type=\"button\" onclick=\"alert('Delete Workout!')\">Delete</button>\n	<div id=\"editWorkoutPopup\" class=\"hidden\">\n		<form id=\"editWorkoutForm\">\n			Date: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + " name=\"date\">\n			<input type=\"submit\" />\n		</form>\n	</div>\n</div>\n\n<div id=\"addExercise-template\">\n	\n	<button id=\"addExerciseButton\" type=\"button\">Add Exercise</button>\n	<div id=\"addExercisePopup\" class=\"hidden\">\n		<form id=\"addExerciseForm\">\n			Exercise Name: <input type=\"text\" name=\"exName\"><br>\n			Sets: <input type=\"text\" name=\"sets\"><br>\n			Reps: <input type=\"text\" name=\"reps\"><br>\n			Weight: <input type=\"text\" name=\"weight\">\n			<input type=\"submit\" />\n		</form>\n	</div>\n</div>\n\n<div id=\"exerciseDetails-template\">\n\n	<span class=\"meta\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ": ("
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + "x"
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + ") using "
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " pounds</span>\n	<button id=\"editExerciseButton\" type=\"button\">Edit</button>\n	<button type=\"button\" onclick=\"alert('Delete Exercise!')\">Delete</button>\n	<div id=\"editExercisePopup\" class=\"hidden\">\n		<form id=\"editExerciseForm\">\n			Exercise Name: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " name=\"exName\"><br>\n			Sets: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + " name=\"sets\"><br>\n			Reps: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + " name=\"reps\"><br>\n			Weight: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " name=\"weight\">\n			<input type=\"button\" value=\"Submit\">\n		</form>\n	</div>\n</div>";
},"useData":true});
})();
