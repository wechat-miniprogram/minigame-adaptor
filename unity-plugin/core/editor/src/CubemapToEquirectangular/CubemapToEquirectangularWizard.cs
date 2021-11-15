using System;
using System.IO;
using UnityEditor;
using UnityEngine;
namespace WeChat {
    class CubemapToEquirectangularWizard : ScriptableWizard {
        public Cubemap cubemap = null;
        public int outputWidth = 1024;
        public int outputHeight = 1024;

        private Shader conversionShader;
        private Material conversionMaterial;

        [MenuItem ("Tools/Cubemap to Equirectangular")]
        static void CreateWizard () {
            DisplayWizard<CubemapToEquirectangularWizard> ("Cubemap to Equirectangular", "Convert");
        }

        void OnWizardCreate () {
            bool valid = true;

            conversionShader = Shader.Find ("Conversion/CubemapToEquirectangular");
            if (conversionShader == null) {
                Debug.LogWarning ("Unable to find shader");
                valid = false;
            } else {
                conversionMaterial = new Material (conversionShader);
            }

            if (cubemap == null) {
                Debug.LogWarning ("You must specify a cubemap");
                valid = false;
            } else if (outputWidth < 1) {
                Debug.LogWarning ("Width must be greater than 0");
                valid = false;
            } else if (outputHeight < 1) {
                Debug.LogWarning ("Height must be greater than 0");
                valid = false;
            }

            if (!valid) return;

            CubeToEquirectangular (cubemap);
        }

        public string CubeToEquirectangular (Cubemap cubemap) {
            //Change to gamma color space
            //http://docs.unity3d.com/Manual/LinearLighting.html
            conversionShader = Shader.Find ("Conversion/CubemapToEquirectangular");
            conversionMaterial = new Material(conversionShader);

            ColorSpace initialColorSpace = PlayerSettings.colorSpace;
            PlayerSettings.colorSpace = ColorSpace.Gamma;

            RenderTexture renderTexture = new RenderTexture (outputWidth, outputHeight, 24);
            Texture2D equirectangularTexture = new Texture2D (outputWidth, outputHeight, TextureFormat.ARGB32, false);
            for (int i = 0; i < 7; i++) {
                float xtiling = (float) (Math.Pow (0.5, i));
                float ytiling = (float) (Math.Pow (0.5, i + 1));
                float yoffset = (float) (1.0 - xtiling);

                conversionMaterial.SetFloat ("_Mipmap", i);
                conversionMaterial.SetVector ("_TilingOffset", new Vector4 (xtiling, 0, ytiling, yoffset));
                Graphics.Blit (cubemap, renderTexture, conversionMaterial);
            }

            equirectangularTexture.ReadPixels (new Rect (0, 0, outputWidth, outputHeight), 0, 0, false);
            equirectangularTexture.Apply ();

            byte[] bytes = equirectangularTexture.EncodeToPNG ();

            DestroyImmediate (equirectangularTexture);

            string assetPath = AssetDatabase.GetAssetPath (cubemap);
            string assetDir = Path.GetDirectoryName (assetPath);
            string assetName = Path.GetFileNameWithoutExtension (assetPath) + ".png";
            string textureAsset = Path.Combine (assetDir, assetName);
            textureAsset = textureAsset.Replace ('\\', '/');
            File.WriteAllBytes (textureAsset, bytes);

            AssetDatabase.ImportAsset (textureAsset);

            Debug.Log ("Equirectangular asset successfully saved to " + textureAsset);

            //Revert color space
            PlayerSettings.colorSpace = initialColorSpace;

            return textureAsset;
        }
    }
}