const Location = require("../models/locationModel");

exports.addLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.json(location);
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.nearest = async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const result = await Location.findOne({
            coordinates: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(lon),
                            parseFloat(lat)
                        ]
                    }
                }
            }
        });

        res.json(result);

    } catch (error) {
        res.status(500).json({ error });
    }
};