$(document).ready(function() {
	submitButtonPressClickListener();
	// fillOutPageForTesting();
});

function fillOutPageForTesting() {
	$("#name").val("Joe Smith");
    $("#photo").val("http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png");
    for(var i=1; i < 11; i++) {
		var id = "#question-" + i; 
		$(id).val("2");
	}
}

function isUserInfoInputFilledIn() {
	var name = $("#name").val();
    var photo = $("#photo").val();
    if (!name || !photo) {
    	return false;
    }
    return true;
}

function clearUserInfoInputs() {
	$("#name").val("");
    $("#photo").val("");
}

function isSurveyFilledIn() {
	for(var i=1; i < 11; i++) {
		var id = "#question-" + i;
		// console.log(id); 
		if (!$(id).val()) {
			// console.log($(id) + " value: " + $(id).val());
			return false;
		}
	}
	return true;
}

function clearSurvey() {
	for(var i=1; i < 11; i++) {
		var id = "#question-" + i; 
		$(id).val("");
	}
}

function alertUser(message) {
	alert(message);
}

function getSurveyData() {
	var scores = [];
	for(var i=1; i < 11; i++) {
		var id = "#question-" + i;
		if ($(id).val().includes("1") || $(id).val().includes("5")) {
			scores.push($(id).val()[0]);
		} else {
			scores.push($(id).val());
		}
	}
	return scores;
}

function getUserData() {
	var userData = {};
	userData["name"] = $("#name").val();
	userData["photo"] = $("#photo").val();
	userData["scores"] = getSurveyData();
	return userData;
}

function postUserDataToServer() {
	$.ajax({
		method: "POST",
		url: "/api/friends",
		data: getUserData(),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(result) {
			// Grab the result from the AJAX post so that the best match's name and photo are displayed.
			$("#match-name").text(data.name);
			$("#match-img").attr("src", data.photo);

			// Show the modal with the best match
			$("#results-modal").modal("toggle");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Sorry, invalid request.");
			console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
			}
	});
}

function submitButtonPressClickListener() {
	$("#submit").on("click", function(event) {
		event.preventDefault();
		if (!isUserInfoInputFilledIn()  && !isSurveyFilledIn()) {
			alertUser("Please fill out your personal info and answer the survey questions before submitting the form");
		} else if (!isUserInfoInputFilledIn()) {
			alertUser("Please fill out your personal info before submitting the form");
		} else if (!isSurveyFilledIn()) {
			alertUser("Please answer the survey questions before submitting the form");
		} else {
			postUserDataToServer();
			clearUserInfoInputs();
			clearSurvey();
		}
	});
}