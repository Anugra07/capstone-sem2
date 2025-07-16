import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all saved trips for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const savedTrips = await prisma.savedTrip.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({ savedTrips });
  } catch (error) {
    console.error('Error fetching saved trips:', error);
    res.status(500).json({ error: 'Failed to fetch saved trips' });
  }
});

// Save a new trip
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('📥 Received save trip request body:', req.body);
    
    const {
      title,
      from,
      to,
      startDate,
      endDate,
      budget,
      groupSize,
      answer,
      steps,
      accommodations,
      foods
    } = req.body;

    console.log('🔍 Extracted fields:', { title, from, to, answer });
    console.log('🔍 Required fields validation:', {
      title: !!title,
      from: !!from,
      to: !!to,
      answer: !!answer
    });

    if (!title || !from || !to || !answer) {
      console.log('❌ Missing required fields:', { title, from, to, answer });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const savedTrip = await prisma.savedTrip.create({
      data: {
        title,
        from,
        to,
        startDate,
        endDate,
        budget: budget ? parseInt(budget) : null,
        groupSize: groupSize ? parseInt(groupSize) : null,
        answer,
        steps,
        accommodations,
        foods,
        userId: req.user.userId
      }
    });

    res.status(201).json({ savedTrip });
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({ error: 'Failed to save trip' });
  }
});

// Get a specific saved trip
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const savedTrip = await prisma.savedTrip.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      }
    });

    if (!savedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ savedTrip });
  } catch (error) {
    console.error('Error fetching saved trip:', error);
    res.status(500).json({ error: 'Failed to fetch saved trip' });
  }
});

// Update a saved trip
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      from,
      to,
      startDate,
      endDate,
      budget,
      groupSize,
      answer,
      steps,
      accommodations,
      foods
    } = req.body;

    const savedTrip = await prisma.savedTrip.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      }
    });

    if (!savedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const updatedTrip = await prisma.savedTrip.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        from,
        to,
        startDate,
        endDate,
        budget: budget ? parseInt(budget) : null,
        groupSize: groupSize ? parseInt(groupSize) : null,
        answer,
        steps,
        accommodations,
        foods
      }
    });

    res.json({ savedTrip: updatedTrip });
  } catch (error) {
    console.error('Error updating saved trip:', error);
    res.status(500).json({ error: 'Failed to update saved trip' });
  }
});

// Delete a saved trip
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const savedTrip = await prisma.savedTrip.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      }
    });

    if (!savedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    await prisma.savedTrip.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting saved trip:', error);
    res.status(500).json({ error: 'Failed to delete saved trip' });
  }
});

export default router; 