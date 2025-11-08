import mongoose from 'mongoose';

const fixtureSchema = new mongoose.Schema({
  cacheKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Auto-eliminar después de 1 hora
  }
}, {
  timestamps: true
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

export default Fixture;