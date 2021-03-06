sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("Netflix.controller.View1", {
		/**
		 *@memberOf Netflix.controller.View1
		 */
		 

		sucheJahr: function() {
			//This code was generated by the layout editor.
			var film = this.getView().byId("__input0").getProperty("value");
			netflixroulette.createRequest("film", function(resp) {
				console.log("flim summary = " + resp.summary);
			});
		}

			(function(namespace) {
				'use strict'
				var API_URL = "http://netflixroulette.net/api/api.php?";

				namespace.createRequest = function(requestData, callback, parseAsXml) {
					parseAsXml = !!parseAsXml;
					if (typeof callback !== 'function') {
						throw new Error("The callback parameter was not a function");
					}
					var queryString = "type=" + (parseAsXml ? "xml" : "json");
					if (typeof requestData === 'string') {
						queryString += "&title=" + requestData;
					} else if (typeof requestData === 'object' && requestData.hasOwnProperty("title")) {
						queryString += "&title=" + requestData.title;

						if (requestData.hasOwnProperty("year")) {
							queryString += "&year=" + requestData.year;
						}
					} else {
						throw new Error("I don't know how to handle " + requestData);
					}

					var httpReq = new XMLHttpRequest();
					httpReq.open("GET", API_URL + queryString.replace(/\s/ig, "%20"), true);
					httpReq.onreadystatechange = function() {
						if (httpReq.readyState !== 4) {
							return;
						}

						if (httpReq.status !== 200) {
							throw new Error("Unexpected HTTP Status Code (" + httpReq.status + ")");
						}

						callback(parseAsXml ? new DOMParser()
							.parseFromString(httpReq.responseText, "text/xml") : JSON.parse(httpReq.responseText));
					};
					httpReq.send();
				};
		
			})
			//jQuery.sap.declare("sap.ui.sample.netflix");
			
			//sap.ui.sample.sap.ui.sample.netflix = { key1 : 'value1' };
			
			// the following line guarantees that <code>sap.ui.sample.subspace</code> is a valid object
			//sap.ui.namespace("sap.ui.sample.netflixroulette");
			
			//A module declaration, ensures that sap.ui.sample exists
			
			//var Netflix = Netflixroulette || {};
 
			//var ns = MYAPPLICATION.createNS("sap.ui.sample.netflix");
			
			//(var netflixroulette || (netflixroulette = {}));

		// Examples

		// Requesting by title only
		netflixroulette.createRequest("Breaking Bad", function(resp) {
			console.log("Breaking Bad's Summary = " + resp.summary);
		});

		// XML Response, resp is a document object
		netflixroulette.createRequest({
			title: "The Boondocks",
			year: 2005
		}, function(resp) {
			console.log("The Boondocks' Summary = " + resp.querySelector("netflixroulette summary").innerHTML);
		}, true);

		// JSON Response, resp is a JSON object
		netflixroulette.createRequest({
			title: "The Boondocks",
			year: 2005
		}, function(resp) {
			console.log("The Boondocks' Summary = " + resp.summary);
		});
	});
});