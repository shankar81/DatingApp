using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API;

public class PhotoService : IPhotoService
{
    public readonly Cloudinary _cloudinary;
    public PhotoService(IOptions<CloudinarySettings> options)
    {
        var acc = new Account
        (
            cloud: options.Value.CloudName,
            apiKey: options.Value.ApiKey,
            apiSecret: options.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);

    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deletionParams = new DeletionParams(publicId);

        return await _cloudinary.DestroyAsync(deletionParams);
    }

    public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                Folder = "da-net7"
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }
}
