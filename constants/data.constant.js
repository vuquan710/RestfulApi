module.exports = {
    freeField: function () {
        return free = {
            "sales.Status": 1,
            "sales.Total_Acres": 1,
            "sales.Avg_CSR2": 1,
            "properties.PIN": 1,
            "properties.CLUID": 1,
            "properties.county": 1,
            "properties.connected": 1,
            "properties.lat_center": 1,
            "properties.lng_center": 1,
            "properties.FIPS": 1,
            "sales.County": 1,
            'properties.county_name': 1,
            'sales.Broker_URL': 1,
            'sales.Price_Acre': 1
        };
    },

    standardField: function () {
        var standard = {
            "sales.Status": 1,
            'sales.Listing_Agent': 1,
            'sales.Direct_URL': 1,
            'sales.Tillable_Acres': 1,
            'properties.sect': 1,
            'sales.Seller': 1,
            'properties.twnshp': 1,
            'properties.range': 1,
            'sales.no_of_co_csr2': 1,
            'sales.owner': 1,
            'sales.Sale_Date': 1,
            'sales.Sale_Price': 1,
            'sales.accessor_url': 1
        };

        return Object.assign(standard, this.freeField());
    },

    enterPriseField: function () {
        var enterprise = {
            "sales.Status": 1,
            'sales.price_of_sale': 1,
            'sales.Comments': 1,
            'sales.Sale_Price': 1,
            'sales.Parcel_ID': 1,
            'sales.Sale_Condition': 1,
            'sales.Buyer': 1,
            'sales.Seller': 1,
            'sales.record_book_page': 1,
            'sales.legal_description': 1,
            'sales.assesor_notes': 1,
            'sales.assessor_records': 1
        };

        return Object.assign(enterprise, this.standardField());
    }
}



