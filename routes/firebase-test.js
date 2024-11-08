// EXAMPLES OF HOW TO USE FIREBASE

// Get a document
app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const docRef = db.collection('users').doc(userId);
    const doc = await docRef.get();
    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.status(404).send('User not found');
    }
  });
  
  // Create a new document
  app.post('/users', async (req, res) => {
    const newUser = req.body;
    const docRef = db.collection('users').doc();
    await docRef.set(newUser);
    res.status(201).send('User created');
  });
  
  // Update a document
  app.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const docRef = db.collection('users').doc(userId);
    await docRef.update(updatedUser);
    res.send('User updated');
  });
  
  // Delete a document
  app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const docRef = db.collection('users').doc(userId);
    await docRef.delete();
    res.send('User deleted');
  });
  