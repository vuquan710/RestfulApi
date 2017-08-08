var moment = require('moment');

module.exports = {
    getNumberDateInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
    },

    convertDate: function (date, start) {
        var d = date.split(" ");
        var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var month = monthNames.indexOf(d[0]);
        if (start) {
            return new Date((month + 1).toString() + "/1/" + d[1]);
        } else {
            var numberDate = this.getNumberDateInMonth(month + 1, d[1]);
            return new Date((month + 1).toString() + "/" + numberDate + "/" + d[1]);
        }
    },

    convertNiceTime: function (time) {
        var date = time.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var month = time.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        return month + "/" + date + "/" + time.getFullYear();
    },


    getTimeCST: function () {
        var date = new Date();
        date = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
        var cstTime = new Date(moment(date).subtract(5, 'hours'));
        return {
            onlyDate: this.convertNiceTime(cstTime),
            fullTime: moment(cstTime).format('MMMM Do YYYY, hh:mm')
        }
    },

    removePrice: function (price) {
        price = price.replace(/,/g, "");
        return parseInt(price.replace("$", ""));
    },

    convertQuerySearch: function (query) {
        var startDateSale = query.saleDate.startLabel;
        startDateSale = this.convertDate(startDateSale, true);
        var endDateSale = query.saleDate.endLabel;
        endDateSale = this.convertDate(endDateSale, false);
        var condition = {
            'sales.Status': {"$in": query.status},
            'sales.County': {"$in": query.county},
            'sales.Sale_Condition': {"$in": query.type}
        }

        if (query.arces.isNa) {
            Object.assign(condition, {
                '$or': [
                    {
                        'sales.Total_Acres': {
                            "$gte": parseInt(query.arces.startLabel), "$lte": parseInt(query.arces.endLabel)
                        }
                    },
                    {'sales.Total_Acres': null}
                ]
            });
        } else {
            Object.assign(condition, {
                'sales.Total_Acres': {
                    "$gte": parseInt(query.arces.startLabel), "$lte": parseInt(query.arces.endLabel)
                }
            });
        }

        if (query.csr2.isNa) {
            Object.assign(condition, {
                '$or': [
                    {
                        'sales.Avg_CSR2': {
                            "$gte": parseInt(query.csr2.startLabel), "$lte": parseInt(query.csr2.endLabel)
                        }
                    },
                    {'sales.Avg_CSR2': null}
                ]
            });
        } else {
            Object.assign(condition, {
                'sales.Avg_CSR2': {
                    "$gte": parseInt(query.csr2.startLabel), "$lte": parseInt(query.csr2.endLabel)
                }
            });
        }

        if (query.tillableArces.isNa) {
            Object.assign(condition, {
                '$or': [
                    {
                        'sales.Tillable_Acres': {
                            "$gte": parseInt(query.tillableArces.startLabel), "$lte": parseInt(query.tillableArces.endLabel)
                        }
                    },
                    {'sales.Tillable_Acres': null}
                ]
            });
        } else {
            Object.assign(condition, {
                'sales.Tillable_Acres': {
                    "$gte": parseInt(query.tillableArces.startLabel), "$lte": parseInt(query.tillableArces.endLabel)
                }
            });
        }

        if (query.priceArces.isNa) {
            Object.assign(condition, {
                '$or': [
                    {
                        'sales.Price_Acre': {
                            "$gte": this.removePrice(query.priceArces.startLabel),
                            "$lte": this.removePrice(query.priceArces.endLabel)
                        }
                    },
                    {'sales.Price_Acre': null}
                ]
            });
        } else {
            Object.assign(condition, {
                'sales.Price_Acre': {
                    "$gte": this.removePrice(query.priceArces.startLabel), "$lte": this.removePrice(query.priceArces.endLabel)
                }
            });
        }

        if (query.saleDate.isNa) {
            Object.assign(condition, {
                '$or': [
                    {
                        'sales.Sale_Date': {
                            "$gte": startDateSale, "$lte": endDateSale
                        }
                    },
                    {'sales.Sale_Date': null}
                ]
            });
        } else {
            Object.assign(condition, {
                'sales.Sale_Date': {
                    "$gte": startDateSale, "$lte": endDateSale
                }
            });
        }

        return condition;
    },

    getEmail: function (user) {
        if ('password' in user['services']) {
            return user.emails[0]['address']
        } else {
            var type = 'facebook' in user['services'] ? 'facebook' : 'google';
            return user['services'][type]['email']
        }
    },

    getFirstNameUser: function (user){
        try {
            return user.services.google.given_name
        } catch(err){

        }

        try {
            return user.services.facebook.first_name
        } catch(err) {

        }

        try{
            return user.profile.firstName
        } catch(err) {

        }

        return ""
    },

    getLastNameUser: function (user) {
        try {
            return user.services.google.family_name
        } catch (err) {
        }
        try {
            return user.services.facebook.last_name
        } catch (err) {
        }
        try {
            return user.profile.lastName
        } catch (err) {
        }

        return ""
    },

    groupListSale: function (listSale) {
        var listConnected = [];
        listSales = [];
        var listGroupSales = [];
        var count = 0;
        for (var i = 0; i < listSale.length;  i++) {
            var connected = listSale[i]['properties']['connected'];
            if (!listGroupSales[JSON.stringify(connected)])
                listGroupSales[JSON.stringify(connected)] = [];
            listGroupSales[JSON.stringify(connected)].push({
                "id": listSale[i]['_id'],
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [listSale[i]['properties']['lng_center'], listSale[i]['properties']['lat_center']]
                },
                "properties": listSale[i]['properties'],
                "sales": listSale[i]['sales'],
                "lat": listSale[i]['properties']['lat_center'],
                "lng": listSale[i]['properties']['lng_center']
            })
        }

        for (var key in listGroupSales) {
            if (listGroupSales.hasOwnProperty(key)) {
                var sumLat = 0;
                var sumLng = 0;
                for (var j = 0; j < listGroupSales[key].length; j++) {
                    sumLat += listGroupSales[key][j]['properties']['lat_center'];
                    sumLng += listGroupSales[key][j]['properties']['lng_center'];
                }

                var lng = sumLng / listGroupSales[key].length;
                var lat = sumLat / listGroupSales[key].length;
                listSales.push({
                    "id": listGroupSales[key][0]['id'],
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lng, lat]
                    },
                    "properties": listGroupSales[key][0]['properties'],
                    "sales": listGroupSales[key][0]['sales'],
                    "lat": lat,
                    "lng": lng
                })
            }
        }

        return listSales;
    }
}