<template>
  <div class="about">
    <h1 align="center">{{ msg }}</h1>
    <v-form>
      <v-container>
        <v-row> </v-row>
        <v-row>
          <v-col cols="4" sm="6" md="6">
            <v-slider
              v-model="fx5.val"
              :color="fx5.color"
              :label="fx5.label"
              min="50"
              max="700"
              thumb-label="always"
            ></v-slider>

            <v-slider
              v-model="fx6.val"
              :label="fx6.label"
              :color="fx6.color"
              min="60"
              max="700"
              thumb-label="always"
            ></v-slider>
          </v-col>
          <v-col cols="4" sm="6" md="6">
            <v-slider
              v-model="fx7.val"
              :label="fx7.label"
              min="1"
              max="5"
              :color="fx7.color"
              thumb-label="always"
            ></v-slider>
            <v-slider
              v-model="fx8.val"
              :label="fx8.label"
              min="10"
              max="100"
              :color="fx8.color"
              thumb-label="always"
            ></v-slider>
            <v-slider
              v-model="fx9.val"
              :label="fx9.label"
              min="8"
              max="15"
              :color="fx8.color"
              thumb-label="always"
            ></v-slider>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center">
        <v-btn rounded color="primary" dark @click="updateWaterplan"
          >Update Bnb Interface</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
<script>
//local registration
/* eslint-disable */
import Airtable from 'airtable';
import axios from "axios";

export default {
  name: "PlanView",
  props: {
    //rows: rows,
    msg: String,
  },
  //component code
  data() {
    return {
      companyName: "",
      requestor: "",
      description: "approval",
      event: [
        { id: 1, label: "hole1" },
        { id: 2, label: "hole12" },
      ],
      item: [],
      date: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      picker: "",
      email: "",
      done: "success",
      ex1: { label: "Hole1", val: 25, color: "#234560" },
      ex2: { label: "Hole2", val: 75, color: "#234560" },
      ex3: { label: "Hole3", val: 50, color: "#234560" },
      ex4: { label: "Hole4", val: 25, color: "#234560" },
      ex5: { label: "Hole1", val: 75, color: "#234560" },
      ex6: { label: "Hole2", val: 50, color: "#234560" },
      ex7: { label: "Hole3", val: 25, color: "#234560" },
      ex8: { label: "Hole4", val: 75, color: "#234560" },
      ex9: { label: "Hole5", val: 50, color: "#234560" },
      ex10: { label: "Hole6", val: 50, color: "#234560" },
      ex11: { label: "Hole7", val: 25, color: "#234560" },
      ex12: { label: "Hole8", val: 75, color: "#234560" },
      ex13: { label: "Hole9", val: 50, color: "#234560" },
      fx5: { label: "Weekday $", val: 75, color: "green lighten-1'" },
      fx6: { label: "Weekend  $", val: 80, color: "green lighten-1'" },
      fx7: { label: "Listings #", val: 5, color: "green lighten-1'" },
      fx8: { label: "Occupancy %", val: 50, color: "#234560" },
      fx9: { label: "Reserved", val: 50, color: "#234560" },
    };
  },
  mounted: function () {
    //this.loadPlan();
    this.updateWaterplan();
  },
  methods: {
    
    submit() {
      console.log("ok");
      this.done = "Ok";
      alert(this.done);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      var gr = this.fx5.val;
      var fw = this.fx6.val;

      //hole 2
      var graphql = JSON.stringify({
        query:
          'mutation MyQuery1 ($greens: Float,$fairway: Float) {\n  update_waterplan(id: "rec0fL8gLI3iETJFn", greens: $greens,  fairway: $fairway) {\n    id\n    greens\n    hole\n    fairway\n  }\n}\n\n\n',
        variables: { greens: gr, fairway: fw },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      fetch(
        "https://api.baseql.com/airtable/graphql/app2gqhRHvmvVKoRf",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      this.sendMessage();
    },
    updateWaterplan() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      var weekday = this.fx5.val;
      var weekend = this.fx6.val;
      var listings = this.fx7.val;
      var occupancy = this.fx8.val;
      var id1 = "rec8UwVPeAwNBh1zI";

      //hole
      var graphql = JSON.stringify({
        query:
          "mutation MyQuery2 ( $listings: Float, $occupancy: Float, $weekday: Float,$weekend: Float) {\n  update_deal(id: \"rec8UwVPeAwNBh1zI\", listings: $listings,  occupancy: $occupancy, weekday: $weekday, weekend: $weekend) {\n    id\n    listings\n    occupancy\n    weekday\n    weekend\n  }\n}\n\n\n",
        variables: { listings: listings, occupancy: occupancy,  weekday: weekday,weekend:weekend },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

    
      fetch(
        "https://api.baseql.com/airtable/graphql/app2gqhRHvmvVKoRf",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },

    sendMessage() {
      console.log("ok");

      var msg = this.description;
      var from = this.requestor;
      var em = this.email;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query:
          "mutation sendEmail ($email: String,$requestor: String,$notes: String) {\n  insert_emails(email: $email, requestor: $requestor, notes: $notes) {\n    email\n    requestor\n    notes\n  }\n}",
        variables: { email: "em", requestor: "from", notes: "msg" },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      fetch(
        "https://api.baseql.com/airtable/graphql/appneKtre6Ux4ESiq",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
  loadPlan: function () {
      console.log('name');
  },
 async onsubmit(){
    var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyjVpG4zXCD49VfC'}).base('app2gqhRHvmvVKoRf');

base('Deal').update([
  {
    "id": "rec8UwVPeAwNBh1zI",
    "fields": {
      "Name": "deal 2",
      "Listings": this.fx5.val,
      "Listings copy": 5,
      "occupancy": this.fx6.val,
      "Weekday": this.fx7.val,
      "weekend": this.fx8.val,
      "expenses horiz": [
        "rec2TQmHZ4yOwu8bb"
      ],
      "month": [
        "rec3EL8CFwIW1XkQx",
        "recFBFfOFFuimvVKr",
        "rec2vpWR4tIt8d0P6",
        "recqBlQ41I8fTIXQ9"
      ],
      "expenses": [
        "recF0q4gNtcSvjgTa",
        "recKx4bItltdalYmC",
        "recHCZgzev1aahQLo",
        "recZCAxPmp2gvSfsw",
        "recSIEACkfdIl2h7R",
        "recrqrmuAu5hebYPS"
      ],
      "Listed": [
        "recevD5FgFEPtBNAe"
      ]
    }
  },
  {
    "id": "rechQ7QF4Jhbc2kJZ",
    "fields": {
      "Name": "deal 1",
      "Listings": 4,
      "Listings copy": 3,
      "occupancy": 0.01,
      "Weekday": 10,
      "weekend": 254,
      "expenses horiz": [
        "rec2TQmHZ4yOwu8bb"
      ],
      "month": [
        "recbdOYDkK1RLgPfK",
        "rec0UmtijvyA9sghV",
        "recwfrSv9GSece1ex",
        "recQy4G6beh8GWlWz",
        "rec8JhmAfS6B4AUgm",
        "recduhI1WWC3r6HPN",
        "recymMOLSzCOb07ek",
        "recSpVSgSlhcN6W1J"
      ],
      "Listed": [
        "recqxzlgHB1BeRpAV"
      ]
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function(record) {
    console.log(record.get('Listings'));
  });
});

    
   
  


  }
};
</script>
<style>
nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
