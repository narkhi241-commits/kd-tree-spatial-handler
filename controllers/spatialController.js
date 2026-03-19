// const Location = require("../models/locationModel");

// exports.addLocation = async (req, res) => {
//     try {
//         const location = await Location.create(req.body);
//         res.json(location);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };


// exports.nearest = async (req, res) => {
//     const { lat, lon } = req.query;

//     try {
//         const result = await Location.findOne({
//             coordinates: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [
//                             parseFloat(lon),
//                             parseFloat(lat)
//                         ]
//                     }
//                 }
//             }
//         });

//         res.json(result);

//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };


const Location = require("../models/locationModel");

// Add a new location
exports.addLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Find the nearest location
exports.nearest = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        const result = await Location.findOne({
            coordinates: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lon), parseFloat(lat)]
                    }
                }
            }
        });

        if (!result) {
            return res.status(404).json({ error: "No nearby location found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};