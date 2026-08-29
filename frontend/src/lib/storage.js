import { supabase } from './supabase';

export const uploadImage = async (file, bucket = 'portfolio-assets', folder = 'uploads') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const uploadMultipleImages = async (files, bucket = 'portfolio-assets', folder = 'uploads') => {
  const uploadPromises = Array.from(files).map(file => uploadImage(file, bucket, folder));
  return Promise.all(uploadPromises);
};
