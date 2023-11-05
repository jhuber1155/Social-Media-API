const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v');

            if(!thought) {
                return res.status(404).json({
                    message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought (req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if (!thought) {
                res.status(404).json({ message: 'No thought associated with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                res.status(404).json({ message: 'No Thought associated with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res){
        try{
            const reaction = await Thought.create(req.body);
            res.json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteReaction(req, res){
        try{
            const reaction = await Thought.findOneAndDelete({ _id: req.params.reactionId });

            if(!reaction) {
                res.status(404).json ({ message: 'No reaction found '});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};