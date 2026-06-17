import { getAlgorithmsList, getAlgorithmDetails } from '../services/algoService.js';

export const listAlgorithms = (req, res) => {
  try {
    const list = getAlgorithmsList();
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch algorithms list', details: error.message });
  }
};

export const getAlgorithm = (req, res) => {
  try {
    const { id } = req.params;
    const details = getAlgorithmDetails(id);
    if (!details) {
      return res.status(404).json({ error: `Algorithm with ID '${id}' not found` });
    }
    return res.status(200).json(details);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch algorithm details', details: error.message });
  }
};
