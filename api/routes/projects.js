const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');
const verifyAdminManager = require('../middleware/verifyAdminOrManagerToken');

const User = require('../models/User');
const Project = require('../models/Project');
const verifyAdminOrManagerToken = require('../middleware/verifyAdminOrManagerToken');

//ROUTE: GET api/projects/me
//DESCRIPTION: Get all projects for current user
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  try {
    //   Find the relevant projects associated with user based on the id that comes in with the request's token. Could be manager role or developer role on project.
    const projects = await Project.find({
      $or: [{ 'developers.user': req.user.id }, { 'manager': req.user.id }],
    });

    //If there is no profile, return an error
    if (projects.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There are no projects available for this user.' });
    }
    //If there are projects, send those projects
    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE:  GET api/projects/:project_id
// DESCRIPTION:    Get project by project id
// ACCESS LEVEL:  Private

router.get('/:project_id', verify, async (req, res) => {
    try {
      const project = await Project.findOne({
        _id: req.params.project_id,
      });
  
      if (!project) return res.status(400).json({ msg: 'Project not found' });
  
      res.json(project);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Project not found' });
      }
      res.status(500).send('Server Error');
    }
  });


//ROUTE: POST api/projects
//DESCRIPTION: Create a new project
//ACCESS LEVEL: Private
router.post(
    '/',
    [
      verify,
      [
        //User express validator to validate required inputs
        check('name', 'Please provide a project name.')
        .not()
        .isEmpty()
        .trim(),
        check('description', 'Please provide a project description.')
        .not()
        .isEmpty()
        .trim(),
        check('targetCompletionDate', 'Please provide a target date in the future.')
        .not()
        .isEmpty(),
        check('manager', 'A manager is required for the project. Select the Add Self button to assign yourself as manager.')
        .not()
        .isEmpty()
      ],
    ],
    async (req, res) => {
      //Add in logic for express validator error check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      //Pull all of the fields out into variables from req.body. Don't include activities or calories consumed today (user can update later).
      const {
        name,
        description,
        targetCompletionDate,
        manager,
      } = req.body;
  
      //Build the projectItems object. If the value is there, add it to the profileItems object.
      const projectItems = {};

      projectItems.creator = req.user.id;
      projectItems.name = name;
      projectItems.description = description;
      const date = new Date(targetCompletionDate);
      projectItems.targetCompletionDate = date;
      projectItems.manager = manager;
      
      //Once all fields are prepared, update and populate the data
      try {
        //Check if a project with that name already exists. 
        //**TODO- Will need to set up functionality to check within the organization.
        let project = await Project.findOne({ name: name });
        if (project) {
          return res.json({
            msg: 'A project with that name already exists. Please choose another name.',
          });
        }

        //If project isn't found, create a new one
        if (!project) {
          project = await new Project(projectItems);
          await project.save();
          res.json(project);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    },
  );
  

//ROUTE: PUT api/projects
//DESCRIPTION: Update an existing project
//ACCESS LEVEL: Private
//Must be Manager on the project or admin to update it



//ROUTE: PUT api/projects/comment/:project_id
//DESCRIPTION: Comment on an existing project
//ACCESS LEVEL: Private
router.put(
    '/comment/:project_id',
    [
      verify,
      [
        check('text', 'Please provide text in the comment field.')
          .not()
          .isEmpty().trim(),
      ],
    ],
    async (req, res) => {
      //Do error checking
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        //Create variable called user to get user. Since we are logged in, we have the id from the token.
        const user = await User.findById(req.user.id).select('-password');
        //Get the project
        const project = await Project.findById(req.params.project_id);
        //Create object for new comment. It's not a collection in database so just an object.
        const newComment = {
          name: user.name,
          text: req.body.text,
          user: req.user.id,
        };
  
        //Add newComment onto project comments at the end of array (want chronological order in this case)
        project.comments.push(newComment);
  
        //Save to database
        await project.save();
  
        //Send back all comments
        res.json(project.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  );

  //Add Route to delete comments?

//ROUTE: DELETE api/projects/:project_id
//DESCRIPTION: Delete a project by project's id
//ACCESS LEVEL: Private
//Must be Manager on the project or admin to delete it
router.delete('/:project_id', verify, async (req, res) => {
    try {
    //Find project based on the project id from request parameters
    const project = await Project.findById(req.params.project_id);
    
    //If the user is not an admin or the manager for the project, deny access.
    if (req.user.role === 'admin' || project.manager.toString() === req.user.id) {
        
    await Project.findOneAndRemove({ _id: req.params.project_id });
      res.json({ msg: 'This project has been deleted.' });
    } else {
        return res.status(401).json({ msg: 'You are not permitted to perform this action.' })
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  });

module.exports = router;
