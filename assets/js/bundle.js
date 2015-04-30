(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var utils=require("./utils");if($("body.index").length>0){var $form=$(".form-phone");var $inputPhone=$(".input-phone");var map;var mapShown=false;$form.on("submit",function(event){event.preventDefault();var phoneNumber=$inputPhone.val();phoneNumber=utils.sanitizePhoneNumber(phoneNumber);if(utils.isValidPhoneNumber(phoneNumber)){window.location.href="/"+phoneNumber}else{window.alert("That phone number doesn't look right.")}});$('a[data-toggle="tab"]').on("shown.bs.tab",function(e){if($(e.target).attr("href")==="#tab-map"){if(mapShown){map.invalidateSize()}else{L.mapbox.accessToken="pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w";var pointGeojsonLayer=L.geoJson(mtb.trail,{pointToLayer:L.mapbox.marker.style});map=L.mapbox.map("map","jcsanford.41fa2f6c",{zoomControl:false});map.addLayer(pointGeojsonLayer);map.setView(L.latLng(35.228082,-80.8442896),9);mapShown=true;var lineGeojsonLayer=L.geoJson(null,{pointToLayer:L.mapbox.marker.style,onEachFeature:function(feature,layer){var p=feature.properties;var popupHtml=['<h2><a href="/trails/'+feature.id+'">'+p.name+"</a></h2>","<h3>"+p.status+" - "+p.status_date_string+"</h3>"];layer.bindPopup(popupHtml.join(""))}});lineGeojsonLayer.addTo(map);$.ajax({url:"/trails.geojson",success:function(data){lineGeojsonLayer.addData(data);map.fitBounds(lineGeojsonLayer.getBounds())},error:function(jqXHR,status,error){console.log("Error fetching trail GeoJSON: "+error)}})}}})}if($("body.trail").length>0){L.mapbox.accessToken="pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w";var pointGeojsonLayer=L.geoJson(mtb.trail,{pointToLayer:L.mapbox.marker.style});var map=L.mapbox.map("map","jcsanford.41fa2f6c",{zoomControl:false});map.addLayer(pointGeojsonLayer);map.setView(L.latLng(mtb.trail.geometry.coordinates[1],mtb.trail.geometry.coordinates[0]),13);if(mtb.trail.properties.has_geojson){var lineGeojsonLayer=L.geoJson(null,{style:L.mapbox.simplestyle.style,onEachFeature:function(feature,layer){var p=feature.properties;var popupHtml=["<h2>"+p.name+"</h2>"];layer.bindPopup(popupHtml.join(""))}});lineGeojsonLayer.addTo(map);$.ajax({url:"/trails/"+mtb.trail.id+".geojson",success:function(data){lineGeojsonLayer.addData(data);map.fitBounds(lineGeojsonLayer.getBounds())},error:function(jqXHR,status,error){console.log("Error fetching trail GeoJSON: "+error)}})}}},{"./utils":2}],2:[function(require,module,exports){function sanitizePhoneNumber(phone){var sanitized=phone.replace(/-/g,"");sanitized=sanitized.replace(/ /g,"");sanitized=sanitized.replace(/\./g,"");sanitized=sanitized.trim();return sanitized}function isValidPhoneNumber(phoneNumber){return phoneNumber.length===10}module.exports={sanitizePhoneNumber:sanitizePhoneNumber,isValidPhoneNumber:isValidPhoneNumber}},{}]},{},[1]);