import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
      name: {
          type: String,
          required: [true, 'Tenant name is required'],
          trim: true,
          maxlength: [100, 'Tenant name cannot exceed 100 characters'],
      },
      slug: {
          type: String,
          required: [true, 'Slug is required'],
          unique: true,
          lowercase: true,
          trim: true,
      },
      supportEmail: {
          type: String,
          required: [true, 'Support email is required'],
          lowercase: true,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
      },
      aiContext: {
          type: String,
          default: null,
      },
    },
    { timestamps: true }
);

export default mongoose.model('Tenant', tenantSchema);