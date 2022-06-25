const router = require ("express").Router();

const{
    getAllUser,
    getUserById,
    createUser,
    updatedUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ("../../controllers/user.js");

// api users
router.route("/").get(getAllUser).post(createUser);

//api user / :id
router.route("/:id").get(getUserById).put(updatedUser).delete(deleteUser);

// api/users/userid/friends/friendID
route.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;