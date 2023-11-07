const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

            if(!user) {
                return res.status(404).json({
                    message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateUser (req, res) {
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                res.status(404).json({ message: 'No User with that ID' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and their thoughts have been deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createFriend(req, res) {
        try{
            const friend = await User.create(req.body);
            res.json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try{
            const friend = await User.findOneAndDelete({ _id: req.params.friendId });

            if(!friend) {
                res.status(404).json ({ message: 'No friend exists with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};