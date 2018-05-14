// JavaScript Document

//Global Variables
var names = [];
var ids = [];
var voted = [];
var members = [];
var republicans = [];
var repPartyVotes = null;
var repPartyVotesTotal = null;
var repPartyPercent = null;
var repStatistics = "";
var democrats = [];
var demPartyVotes = null;
var demPartyVotesTotal = null;
var demPartyPercent = null;
var demStatistics = "";
var independents = [];
var indPartyVotes = null;
var indPartyVotesTotal = null;
var indPartyPercent = null;
var indStatistics = "";

//Reused Functions
function partyVoteCount(){
	//Separate by Party
	for (i = 0; i < members.length; i++){
		if (members[i].party === "R"){
			republicans.push(members[i]);
		}

		if (members[i].party === "D"){
			democrats.push(members[i]);
		}

		if (members[i].party === "I"){
			independents.push(members[i]);
		}
	}

	//Get Party Vote Count
	for (i = 0; i < republicans.length; i++){
		repPartyPercent = republicans[i].votes_with_party_pct;
		repPartyVotes = Math.round((republicans[i].total_votes/100) * repPartyPercent);
		repPartyVotesTotal += repPartyVotes;
	}

	for (i = 0; i < democrats.length; i++){
		demPartyPercent = democrats[i].votes_with_party_pct;
		demPartyVotes = Math.round((democrats[i].total_votes/100) * demPartyPercent);
		demPartyVotesTotal += demPartyVotes;
	}

	for (i = 0; i < independents.length; i++){
		indPartyPercent = independents[i].votes_with_party_pct;
		indPartyVotes = Math.round((independents[i].total_votes/100) * indPartyPercent);
		indPartyVotesTotal += indPartyVotes;
	}

	repStatistics = {"Number of Republicans":+republicans.length, "Party Votes":+repPartyVotesTotal};
	demStatistics = {"Number of Democrats":+democrats.length, "Party Votes":+demPartyVotesTotal};
	indStatistics = {"Number of Independents":+independents.length, "Party Votes":+indPartyVotesTotal};
}// end party vote count

// Eliminates members who never voted, else they show up as 100% attendance
function eliminateNonVoters(){
	for (i = 0; i < members.length; i++){
		if (members[i].total_votes != 0) {
			voted.push(members[i]);
		}
	}
}

//Removes null and empty middle name fields from filtered representative arrays
function editVotedNames(){
	if (voted[i].middle_name == null || "") {
		name = voted[i].first_name+ ' ' + voted[i].last_name;
	}else{
		name = voted[i].first_name + ' ' +voted[i].middle_name+' '+ voted[i].last_name;
	}
	console.log(name);
	// return name;
}

//Removes null and empty middle name fields from complete representative arrays used to compare to filtered results
function editNames(){
	if (members[i].middle_name == null || "") {
		name = members[i].first_name+ ' ' + members[i].last_name;
	}else{
		name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
	}
}

function getSenateStats() {
	var representatives = "";
	var	least_engaged_rows ="";
	var	most_engaged_rows ="";
	var	least_loyal_rows ="";
	var	most_loyal_rows ="";
	var parties = [];
	//	var names = [];
	//	var ids = [];

	var url = "pro-congress-113-senate.json";

	$.getJSON(url, function(responseJSON){
		members = [];
		members = [responseJSON.results[0].members];
		members = members[0];

		partyVoteCount();
		        //Removes null and empty middle name fields from filtered representative arrays
		        function editVotedNames(){
		            if (voted[i].middle_name == null || "") {
		                name = voted[i].first_name+ ' ' + voted[i].last_name;
		            }else{
		                name = voted[i].first_name + ' ' +voted[i].middle_name+' '+ voted[i].last_name;
		                }
		        }
		
		        //Removes null and empty middle name fields from complete representative arrays used to compare to filtered results
		        function editNames(){
		            if (members[i].middle_name == null || "") {
		                name = members[i].first_name+ ' ' + members[i].last_name;
		            }else{
		                name = members[i].first_name + ' ' +members[i].middle_name+' '+ members[i].last_name;
		                }
		        }

		//Creates Least Engaged Table Row Loops        
		if(document.getElementById('senate_least_engaged') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return b.missed_votes_pct - a.missed_votes_pct;}); //Sorts from most to least missed votes

			for (i = 0; i < 10; i++){
				ids.push(voted[i].id);
				name = "";
				editVotedNames();

				console.log(name);

				var missedVotes = voted[i].missed_votes;
				var missedVotePct = voted[i].missed_votes_pct;
				representatives = {"Name":name, "Missed Votes":missedVotes, "Missed Votes Percentage":missedVotePct};
				least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
				least_engaged_rows = least_engaged_rows + least_engaged_row;
			}
			//Check for additional representatives who matched last least engaged record
			var tenPercentMissed = voted[9].missed_votes_pct;
			for (i = 0; i < members.length; i++){
				if ((100 - members[i].missed_votes_pct) == tenPercentMissed && ids.includes(members[i].id)==false){
					name = null;
					editName();
					representatives = {"Name":name, "Missed Votes":missed_votes, "Missed Votes Percentage":missed_votes_pct};
					least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
					least_engaged_rows = least_engaged_rows + least_engaged_row;
				}
			}
		}

		//Creates most Engaged Table Row Loops
		if(document.getElementById('senate_most_engaged') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return a.missed_votes - b.missed_votes;}); //Sorts from most to least made votes percentage
			for (i = 0; i < 10; i++){     //loops through 10 highest voters by percent and creates rows
				ids.push(voted[i].id);
				name = null;
				editVotedNames();
				var madeVotes = voted[i].total_votes - voted[i].missed_votes;
				var madeVotesPct = 100 - voted[i].missed_votes_pct;
				representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
				most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
				most_engaged_rows = most_engaged_rows + most_engaged_row;
			}

			//checks the rest of members array for equally enaged voting records not yet shown
			var tenPercentMade = 100 - voted[9].missed_votes_pct;
			for (i = 0; i < members.length; i++){
				if ((100 - members[i].missed_votes_pct) == tenPercentMade && ids.includes(members[i].id)==false){
					var name = null;
					editNames();
					var madeVotes = members[i].total_votes - members[i].missed_votes;
					var madeVotesPct = 100 - members[i].missed_votes_pct;
					representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
					most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
					most_engaged_rows = most_engaged_rows + most_engaged_row;
				}
			}
		}

		//Creates Least Loyal Table Row Loops
		if(document.getElementById('senate_least_loyal') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return a.votes_with_party_pct - b.votes_with_party_pct;}); //Sorts from least to most party votes
			for (i = 0; i < 10; i++){
				ids.push(members[i].id);
				name = null;
				editVotedNames();

				var partyLineVotes = Math.round((voted[i].total_votes * voted[i].votes_with_party_pct)/100);
				var partyLineVotePct = voted[i].votes_with_party_pct;
				representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				least_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				least_loyal_rows = least_loyal_rows + least_loyal_row;
			}
			for (i = 0; i < members.length; i++){
				var tenPercentLeastLoyal = members[9].votes_with_party_pct;
				if (members[i].votes_with_party_pct == tenPercentLeastLoyal && ids.includes(members[i].id)==false){
					var name = null;
					editNames();
					var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
					var partyLineVotePct = members[i].votes_with_party_pct;
					representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
					least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
					least_loyal_rows = least_loyal_rows + least_loyal_row;
				}
			}
		}

		//Creates Most Loyal Table Row Loops
		if(document.getElementById('senate_most_loyal') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return b.votes_with_party_pct - a.votes_with_party_pct;}); //Sorts from most to least party votes
			for (i = 0; i < 10; i++){
				ids.push(members[i].id);
				name = null;
				editVotedNames();
				var partyLineVotes = Math.round((voted[i].total_votes * voted[i].votes_with_party_pct)/100);
				var partyLineVotePct = voted[i].votes_with_party_pct;
				representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				most_loyal_rows = most_loyal_rows + most_loyal_row;
			}
			for (i = 0; i < members.length; i++){
				var tenPercentMostLoyal = members[9].votes_with_party_pct;
				if (members[i].votes_with_party_pct == tenPercentMostLoyal && ids.includes(members[i].id)==false){
					var name = null;
					editNames();
					var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
					var partyLineVotePct = members[i].votes_with_party_pct;
					representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
					most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
					most_loyal_rows = most_loyal_rows + most_loyal_row;
				}
			}
		}


		//Create Table Rows
		var senate_glance_rows = "<tr><td>Republicans</td><td>" + repStatistics["Number of Republicans"] +"</td><td>" + repStatistics["Party Votes"] +"</td></tr><tr><td>Democrats</td><td>" + demStatistics["Number of Democrats"] +"</td><td>" + demStatistics["Party Votes"] +"</td></tr><tr><td>Independents</td><td>" + indStatistics["Number of Independents"] +"</td><td>" + indStatistics["Party Votes"] +"</td></tr>";

		document.getElementById('senate_glance').innerHTML = "<table class=\"table\"><thead><tr><th>Party</th><th>Number of Senators</th><th>Party Line Votes</th></tr></thead><tbody>"+senate_glance_rows+"</tbody></table>";

		// <!--senate Least Loyal Table-->
		if(document.getElementById('senate_least_loyal') != null){
			document.getElementById('senate_least_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+least_loyal_rows+"</tbody></table>";
		}

		// <!--senate Most Loyal Table-->
		if(document.getElementById('senate_most_loyal') != null){
			document.getElementById('senate_most_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+most_loyal_rows+"</tbody></table>";
		}

		// <!--senate Least Engaged Table-->
		if(document.getElementById('senate_least_engaged') != null){
			document.getElementById('senate_least_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Missed Votes</th><th>Percentage of Missed Votes</th></tr></thead><tbody>"+least_engaged_rows+"</tbody></table>";
		}

		// <!--senate Most Engaged Table-->
		if(document.getElementById('senate_most_engaged') != null){
			document.getElementById('senate_most_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Votes Made</th><th>Percentage of Votes Made</th></tr></thead><tbody>"+most_engaged_rows+"</tbody></table>";
		}

	})

}
//end getsenateStats

function getHouseStats() {
	var representatives = "";
	var	least_engaged_rows ="";
	var	most_engaged_rows ="";
	var	least_loyal_rows ="";
	var	most_loyal_rows ="";
	var parties = [];

	var url = "pro-congress-113-house.json";

	$.getJSON(url, function(responseJSON){
		members = [];
		members = [responseJSON.results[0].members];
		members = members[0];

		partyVoteCount();

		//Creates Least Engaged Table Row Loops
		if(document.getElementById('house_least_engaged') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return b.missed_votes_pct - a.missed_votes_pct;}); //Sorts from most to least missed votes
			for (i = 0; i < 10; i++){
                ids.push(voted[i].id);
				name = null;
				editVotedNames();

				var missedVotes = voted[i].missed_votes;
				var missedVotePct = voted[i].missed_votes_pct;
				representatives = {"Name":name, "Missed Votes":missedVotes, "Missed Votes Percentage":missedVotePct};
				least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
				least_engaged_rows = least_engaged_rows + least_engaged_row;
			}
			//Check for additional representatives who matched last least engaged record
			for (i = 0; i < members.length; i++){
				var tenPercentMissed = members[9].missed_votes_pct;
				if ((100 - members[i].missed_votes_pct) == tenPercentMade && members[i].id in ids == true){
					name = null;
					representatives = {"Name":name, "Missed Votes":missed_votes, "Missed Votes Percentage":missed_votes_pct};
					least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Missed Votes"] +"</td><td>" + representatives["Missed Votes Percentage"] +"</td></tr>"
					least_engaged_rows = least_engaged_rows + least_engaged_row;
				}
			}
		}

		//Creates most Engaged Table Row Loops
		if(document.getElementById('house_most_engaged') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();

			voted.sort(function(a,b){return a.missed_votes - b.missed_votes;}); //Sorts from most to least made votes

			for (i = 0; i < 10; i++){     //loops through 10 highest voters and creates rows
                ids.push(voted[i].id);
				name = null;
				editVotedNames();

				var madeVotes = voted[i].total_votes - voted[i].missed_votes;
				var madeVotesPct = 100 - voted[i].missed_votes_pct;
				representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
				most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
				most_engaged_rows = most_engaged_rows + most_engaged_row;
			}

			for (i = 0; i < members.length; i++){     //checks the rest of members array for equal voting percentages and makes row
				var tenPercentMade = 100 - members[9].missed_votes_pct;
				if ((100 - members[i].missed_votes_pct) == tenPercentMade  && (members[i].id != ids[i])){
					name = null;
					editNames();

					var madeVotes = members[i].total_votes - members[i].missed_votes;
					var madeVotesPct = 100 - members[i].missed_votes_pct;
					representatives = {"Name":name, "Made Votes":madeVotes, "Made Votes Percentage":madeVotesPct};
					most_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Made Votes"] +"</td><td>" + representatives["Made Votes Percentage"] +"</td></tr>"
					most_engaged_rows = most_engaged_rows + most_engaged_row;
				}
			}
		}

		//Creates Least Loyal Table Row Loops
		if(document.getElementById('house_least_loyal') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();

			voted.sort(function(a,b){return a.votes_with_party_pct - b.votes_with_party_pct;}); //Sorts from least to most party votes

			for (i = 0; i < 10; i++){
                ids.push(voted[i].id);
				name = null;
				editVotedNames();

				var partyLineVotes = Math.round((voted[i].total_votes * voted[i].votes_with_party_pct)/100);
				var partyLineVotePct = voted[i].votes_with_party_pct;
				representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				least_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				least_loyal_rows = least_loyal_rows + least_loyal_row;
			}
			for (i = 0; i < members.length; i++){
				var tenPercentLeastLoyal = members[9].votes_with_party_pct;
				if ((100 - members[i].missed_votes_pct) == tenPercentMade  && (members[i].id != ids[i])){
					name = null;
					editNames();

					var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
					var partyLineVotePct = members[i].votes_with_party_pct;
					representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
					least_engaged_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
					least_loyal_rows = least_loyal_rows + least_loyal_row;
				}
			}
		}

		//Creates Most Loyal Table Row Loops
		if(document.getElementById('house_most_loyal') != null){
			ids = [];
			voted = [];
			eliminateNonVoters();
			voted.sort(function(a,b){return b.votes_with_party_pct - a.votes_with_party_pct;}); //Sorts from most to least party votes

			for (i = 0; i < 10; i++){
				ids.push(members[i].id);
				name = null;
				editVotedNames();

				var partyLineVotes = Math.round((voted[i].total_votes * voted[i].votes_with_party_pct)/100);
				var partyLineVotePct = voted[i].votes_with_party_pct;
				representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
				most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
				most_loyal_rows = most_loyal_rows + most_loyal_row;
			}

			for (i = 0; i < members.length; i++){
				var tenPercentMostLoyal = members[9].votes_with_party_pct;
				if ((100 - members[i].votes_with_party_pct) == tenPercentMostLoyal && (members[i].id != ids[i])){
					name = null;
					editNames();

					var partyLineVotes = Math.round((members[i].total_votes * members[i].votes_with_party_pct)/100);
					var partyLineVotePct = members[i].votes_with_party_pct;
					representatives = {"Name":name, "Party Line Votes":partyLineVotes, "Party Line Percentage":partyLineVotePct};
					most_loyal_row = "<tr><td>" + representatives["Name"] +"</td><td>" + representatives["Party Line Votes"] +"</td><td>" + representatives["Party Line Percentage"] +"</td></tr>"
					most_loyal_rows = most_loyal_rows + most_loyal_row;
				}
			}
		}

		//Create Table Rows
		var house_glance_rows = "<tr><td>Republicans</td><td>" + repStatistics["Number of Republicans"] +"</td><td>" + repStatistics["Party Votes"] +"</td></tr><tr><td>Democrats</td><td>" + demStatistics["Number of Democrats"] +"</td><td>" + demStatistics["Party Votes"] +"</td></tr><tr><td>Independents</td><td>" + indStatistics["Number of Independents"] +"</td><td>" + indStatistics["Party Votes"] +"</td></tr>";

		document.getElementById('house_glance').innerHTML = "<table class=\"table\"><thead><tr><th>Party</th><th>Number of Representatives</th><th>Party Line Votes</th></tr></thead><tbody>"+house_glance_rows+"</tbody></table>";

		// <!--house Least Loyal Table-->
		if(document.getElementById('house_least_loyal') != null){
			document.getElementById('house_least_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+least_loyal_rows+"</tbody></table>";
		}

		// <!--house Most Loyal Table-->
		if(document.getElementById('house_most_loyal') != null){
			document.getElementById('house_most_loyal').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Party Line Votes</th><th>Party Line %</th></tr></thead><tbody>"+most_loyal_rows+"</tbody></table>";
		}

		// <!--house Least Engaged Table-->
		if(document.getElementById('house_least_engaged') != null){
			document.getElementById('house_least_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Missed Votes</th><th>Percentage of Missed Votes</th></tr></thead><tbody>"+least_engaged_rows+"</tbody></table>";
		}

		// <!--house Most Engaged Table-->
		if(document.getElementById('house_most_engaged') != null){
			document.getElementById('house_most_engaged').innerHTML = "<table class=\"table\"><thead><tr><th>Name</th><th>Number of Votes Made</th><th>Percentage of Votes Made</th></tr></thead><tbody>"+most_engaged_rows+"</tbody></table>";
		}

	})

}
// <!--end getHouseStats -->




/*

$.getJSON(url, function(data){

showMeData(data);
printTable();
calcStats();
makeCalcs();
showMembers();

})

function showMeData(receivedData){
console.log(receivedData)

}
*/
//
