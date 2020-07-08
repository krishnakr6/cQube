const router = require('express').Router();
var const_data = require('../../../lib/config'); // Log Variables
const { logger } = require('../../../lib/logger');
const auth = require('../../../middleware/check-auth');

router.post('/allBlockWise', auth.authController, async (req, res) => {
    try {
        logger.info('--- all blocks infra api ---');
        const_data['getParams']['Key'] = 'infra/infra_block_map.json'
        const_data['s3'].getObject(const_data['getParams'], async function (err, data) {
            if (err) {
                logger.error(err);
                res.status(500).json({ errMsg: "Something went wrong" });
            } else if (!data) {
                logger.error("No data found in s3 file");
                res.status(403).json({ errMsg: "No such data found" });
            } else {
                let blockData = data.Body.toString();
                blockData = JSON.parse(blockData);
                var mydata = blockData.map(block => {
                    var obj = {
                        lat: block.lat,
                        lng: block.long,
                        schCount: parseInt(block.total_schools_data_received),
                        // stdCount: parseInt(block.total_students),
                        // totalFundReceived: parseInt(block.total_central_funds_received).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"),
                        // fundPerSchoolReceived: parseInt(block.funds_per_school).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"),
                        // fibernet_percent: block.fibernet_percent,
                        districtId: block.district_id,
                        districtName: block.district_name,
                        blockId: block.block_id,
                        blockName: block.block_name,
                        // average_percent: block.average_percent,
                        infra_score: block.infra_score,
                        hand_wash_percent: block.hand_wash_percent,
                        solar_panel_percent: block.solar_panel_percent,
                        library_percent: block.library_percent,
                        drinking_water_percent: block.drinking_water_percent,
                        tap_water_percent: block.tap_water_percent,
                        hand_pumps_percent: block.hand_pumps_percent,
                        electricity_percent: block.electricity_percent,
                        toilet_percent: block.toilet_percent,
                        boys_toilet_percent: block.boys_toilet_percent,
                        girls_toilet_percent: block.girls_toilet_percent,
                        access_to_toilet_percent: block.access_to_toilet_percent,
                        access_to_water_percent: block.access_to_water_percent

                    }
                    return obj;
                });
                logger.info('--- blocks infra api response sent---');
                res.status(200).send(mydata);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ errMessage: "Internal error. Please try again!!" });
    }
})

router.post('/blockWise/:distId', auth.authController, async (req, res) => {
    try {
        logger.info('--- block wise infra api ---');
        const_data['getParams']['Key'] = 'infra/infra_block_map.json'
        const_data['s3'].getObject(const_data['getParams'], async function (err, data) {
            if (err) {
                logger.error(err);
                res.status(500).json({ errMsg: "Something went wrong" });
            } else if (!data) {
                logger.error("No data found in s3 file");
                res.status(403).json({ errMsg: "No such data found" });
            } else {
                let blockData = data.Body.toString();
                blockData = JSON.parse(blockData);

                let distId = req.params.distId

                let filterData = blockData.filter(obj => {
                    return (obj.district_id == distId)
                })
                let mydata = filterData.map(block => {
                    var obj = {
                        lat: block.lat,
                        lng: block.long,
                        schCount: parseInt(block.total_schools_data_received),
                        // stdCount: parseInt(block.total_students),
                        // totalFundReceived: parseInt(block.total_central_funds_received).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"),
                        // fundPerSchoolReceived: parseInt(block.funds_per_school).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,"),
                        // fibernet_percent: block.fibernet_percent,
                        districtId: block.district_id,
                        districtName: block.district_name,
                        blockId: block.block_id,
                        blockName: block.block_name,
                        // average_percent: block.average_percent,
                        infra_score: block.infra_score,
                        hand_wash_percent: block.hand_wash_percent,
                        solar_panel_percent: block.solar_panel_percent,
                        library_percent: block.library_percent,
                        drinking_water_percent: block.drinking_water_percent,
                        tap_water_percent: block.tap_water_percent,
                        hand_pumps_percent: block.hand_pumps_percent,
                        electricity_percent: block.electricity_percent,
                        toilet_percent: block.toilet_percent,
                        boys_toilet_percent: block.boys_toilet_percent,
                        girls_toilet_percent: block.girls_toilet_percent,
                        access_to_toilet_percent: block.access_to_toilet_percent,
                        access_to_water_percent: block.access_to_water_percent

                    }
                    return obj;
                });
                logger.info('--- block per dist infra api response sent---');
                res.status(200).send(mydata);

            }
        })
    } catch (e) {
        logger.error(e);
        res.status(500).json({ errMessage: "Internal error. Please try again!!" });
    }
})


module.exports = router;