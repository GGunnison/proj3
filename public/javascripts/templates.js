(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"title\">\n	<h1>LiftMate</h1>\n</div>\n\n\n<div id=\"register\">\n		<h1>Register</h1>\n		<form id=\"register-form\">\n			<div>Username: <input type=\"text\" name=\"username\" required /></div>\n			<div>Weight: <input type=\"number\" name=\"weight\" required /></div>\n			<div>Age: <input type=\"Number\" name=\"age\" required /></div>\n			<div>Password: <input type=\"password\" name=\"password\" required /></div>\n			<div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n			<input type=\"submit\"/>\n		</form>\n	</div>\n\n\n	<div id=\"signin\">\n		<h1>Sign in</h1>\n		<form id=\"signin-form\" action=\"/login\" method=\"post\">\n			<div>Username: <input type=\"text\" name=\"username\" required /></div>\n			<div>Password: <input type=\"password\" name=\"password\" required /></div>\n			<input type=\"submit\" />\n		</form>\n	</div>";
  },"useData":true});
templates['userPage'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "	<div>\n		<div>\n			<span class=\"meta\">Workout (";
  stack1 = ((helpers.trimString || (depth0 && depth0.trimString) || helperMissing).call(depth0, (depth0 != null ? depth0.date : depth0), {"name":"trimString","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ")</span>\n			<button class=\"editWorkout\" id=\"editWorkoutButton\" type=\"button\">Edit</button>\n			<button type=\"button\" id=\"deletebutton\" value="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " >Delete</button>\n			<div class =\"editWorkoutPopup hidden\">\n				<form class=\"editWorkoutForm\">\n					Date: <input type=\"date\" value=";
  stack1 = ((helpers.trimString || (depth0 && depth0.trimString) || helperMissing).call(depth0, (depth0 != null ? depth0.date : depth0), {"name":"trimString","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " name=\"date\">\n					<input class=\"hidden\" value="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " name =\"workoutID\"> \n					<input type=\"submit\"/>\n				</form>\n			</div></br>\n			<div>\n				<div class=\"addExercise\">\n					<button class=\"addExerciseButton\" type=\"button\">Add Exercise</button>\n					<div class=\"addExercisePopup hidden\">\n						<form class=\"addExerciseForm\">\n							Exercise Name: <input type=\"text\" name=\"name\" required><br>\n							Sets: <input type=\"text\" name=\"setCount\" required><br>\n							Reps: <input type=\"text\" name=\"repCount\" required><br>\n							Weight: <input type=\"text\" name=\"weight\" required>\n							<input class=\"hidden\" value="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " name=\"workoutID\">\n							<input type=\"submit\" />\n						</form>\n					</div>\n				</div>\n			</div>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.exercises : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n		</div>\n	<div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "				<div>\n					<span class=\"meta\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ": ("
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + "x"
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + ") using "
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " pounds</span>\n					<button class=\"editExerciseButton\" type=\"button\">Edit</button>\n					<button type=\"button\" onclick=\"alert('Delete Exercise!')\">Delete</button>\n					<div class=\"editExercisePopup hidden\">\n						<form class=\"editExerciseForm\">\n							Exercise Name: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " name=\"name\"><br>\n							Sets: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + " name=\"setCount\"><br>\n							Reps: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + " name=\"repCount\"><br>\n							Weight: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " name=\"weight\">\n							<input class=\"hidden\" value="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " name=\"exerciseID\">\n							<input type=\"submit\" />\n						</form>\n					</div>\n					<br>\n				</div>				\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n<div id=\"addWorkout-template\">	\n	<button id=\"addWorkoutButton\" type=\"button\">Add Workout</button>\n	<div id=\"addWorkoutPopup\" class=\"hidden\">\n		<form id=\"addWorkoutForm\">\n			Date: <input type=\"date\" name=\"date\" required><br>\n			<input type=\"submit\" />\n		</form>\n	</div>\n</div>\n\n<div id=\"logoutdiv\">\n	<button id=\"logoutButton\">Logout</button>\n</div>\n\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.workout : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n\n\n";
},"useData":true});
})();
