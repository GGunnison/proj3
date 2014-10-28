(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addExercise'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"addExercise-template\">\r\n	<script>\r\n	  	$('#addExerciseButton').click(function(){\r\n			$('#addExercisePopup').removeClass(\"hidden\");\r\n		});\r\n	</script>\r\n	<button id=\"addExerciseButton\" type=\"button\")\">Add Exercise</button>\r\n	<div id=\"addExercisePopup\" class=\"hidden\">\r\n		<form id=\"addExerciseForm\">\r\n			Exercise Name: <input type=\"text\" name=\"exName\"><br>\r\n			Sets: <input type=\"text\" name=\"sets\"><br>\r\n			Reps: <input type=\"text\" name=\"reps\"><br>\r\n			Weight: <input type=\"text\" name=\"weight\">\r\n			<input type=\"button\" value=\"Submit\">\r\n		</form>\r\n	</div>\r\n</div>";
  },"useData":true});
templates['exerciseDetails'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"exerciseDetails-template\">\r\n	<script>\r\n	  	$('#editExerciseButton').click(function(){\r\n			$('#editExercisePopup').removeClass(\"hidden\");\r\n		});\r\n	</script>\r\n	<span class=\"meta\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ": ("
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + "x"
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + ") using "
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " pounds</span>\r\n	<button id=\"editExerciseButton\" type=\"button\">Edit</button>\r\n	<button type=\"button\" onclick=\"alert('Delete Exercise!')\">Delete</button>\r\n	<div id=\"editExercisePopup\" class=\"hidden\">\r\n		<form id=\"editExerciseForm\">\r\n			Exercise Name: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " name=\"exName\"><br>\r\n			Sets: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.setCount || (depth0 != null ? depth0.setCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"setCount","hash":{},"data":data}) : helper)))
    + " name=\"sets\"><br>\r\n			Reps: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.repCount || (depth0 != null ? depth0.repCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"repCount","hash":{},"data":data}) : helper)))
    + " name=\"reps\"><br>\r\n			Weight: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"weight","hash":{},"data":data}) : helper)))
    + " name=\"weight\">\r\n			<input type=\"button\" value=\"Submit\">\r\n		</form>\r\n	</div>\r\n</div>";
},"useData":true});
templates['index'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"error\">"
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"register\">\n  <h1>Register</h1>\n  <div class=\"error\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n  <form id=\"register-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Weight: <input type=\"number\" name=\"weight\" required /></div>\n    <div>Age: <input type=\"Number\" name=\"weight\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\n    <input id=\"submit\"></input>\n  </form>\n</div>\n\n\n<div id=\"signin\">\n  <h1>Sign in</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <form id=\"signin-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>";
},"useData":true});
templates['signin'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"error\">"
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"signin\">\n  <h1>Sign in</h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <form id=\"signin-form\">\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\n    <input type=\"submit\" />\n  </form>\n</div>";
},"useData":true});
templates['workoutDetails'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"workoutDetails-template\">\r\n	<script>\r\n	  	$('#editWorkoutButton').click(function(){\r\n			$('#editWorkoutPopup').removeClass(\"hidden\");\r\n		});\r\n	</script>\r\n	<span class=\"meta\">Workout ("
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + ")</span>\r\n	<button id=\"editWorkoutButton\" type=\"button\">Edit</button>\r\n	<button type=\"button\" onclick=\"alert('Delete Workout!')\">Delete</button>\r\n	<div id=\"editWorkoutPopup\" class=\"hidden\">\r\n		<form id=\"editWorkoutForm\">\r\n			Date: <input type=\"text\" value="
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + " name=\"date\">\r\n			<input type=\"button\" value=\"Submit\">\r\n		</form>\r\n	</div>\r\n</div>";
},"useData":true});
})();
