const Note = require("./../model/NoteModel");
const mongoose = require("mongoose");

exports.dashboard = async (req, res, next) => {
  const perPage = 12;
  const page = parseInt(req.query.page, 10) || 1;

  const locals = {
    title: "Dashboard",
    description: "Free Nodejs Notes",
  };

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // Correct usage with 'new'

    // Fetch notes with pagination and aggregation
    const notes = await Note.aggregate([
      {
        $match: { user: userId }, // Match notes for the logged-in user
      },
      {
        $sort: { createdAt: -1 }, // Sort notes by creation date (most recent first)
      },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] }, // Limit title length
          body: { $substr: ["$body", 0, 100] }, // Limit body length
        },
      },
    ])
      .skip(perPage * (page - 1)) // Pagination logic
      .limit(perPage); // Limit results per page

    const totalNotes = await Note.countDocuments({ user: userId }); // Get total note count for the user
    const totalPages = Math.ceil(totalNotes / perPage);

    // Render the dashboard with the notes and pagination info
    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      current: page,
      pages: totalPages,
      layout: "../views/layouts/dashboard",
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).send("Server error");
  }
};

exports.viewitem = async (req, res, next) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard.ejs",
    });
  } else {
    res.send("Somthing went wrong ");
  }
};

exports.updateitem = async (req, res, next) => {
  try {
    // Include both the `_id` and `user` conditions in the query
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Match the note by ID and user
      {
        title: req.body.title, // Update the title
        body: req.body.body, // Update the body
      },
      { new: true } // Return the updated document
    );

    if (!note) {
      // Handle case where no matching document is found
      return res
        .status(404)
        .send("Note not found or you don't have permission to update it.");
    }

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteItem = async (req, res, next) => {
  await Note.findByIdAndDelete({ _id: req.params.id }).where({
    user: req.user.id,
  });
  res.redirect("/dashboard");
};

exports.addnote = async (req, res, next) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard.ejs",
  });
};



exports.addNewNote = async(req,res,next)=>{ 
  req.body.user = req.user.id
   await Note.create(req.body); 
  res.status(201).redirect('/dashboard')
}



exports.searchitem = async (req,res,next)=>{ 
  res.render('/dashboard/search',{
    searchResults:'',
    layout: "../views/layouts/dashboard.ejs"
  })
}


exports.searchitemsubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};