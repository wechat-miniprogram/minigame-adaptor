using System;
using UnityEngine;
namespace WeChat {
    class MathUtil {
        public static bool Decompose (Matrix4x4 matrix, out Vector3 scale, out Quaternion rotation, out Vector3 translation) {
            Matrix4x4 rotationMatrix;
            Decompose (matrix, out scale, out rotationMatrix, out translation);
            RotationMatrix (rotationMatrix, out rotation);
            return true;
        }

        public static bool Decompose (Matrix4x4 matrix, out Vector3 scale, out Matrix4x4 rotation, out Vector3 translation) {
            //Get the translation.
            translation.x = matrix.m30;
            translation.y = matrix.m31;
            translation.z = matrix.m32;

            //Scaling is the length of the rows.
            scale.x = (float) Math.Sqrt ((matrix.m00 * matrix.m00) + (matrix.m01 * matrix.m01) + (matrix.m02 * matrix.m02));
            scale.y = (float) Math.Sqrt ((matrix.m10 * matrix.m10) + (matrix.m11 * matrix.m11) + (matrix.m12 * matrix.m12));
            scale.z = (float) Math.Sqrt ((matrix.m20 * matrix.m20) + (matrix.m21 * matrix.m21) + (matrix.m22 * matrix.m22));

            //If any of the scaling factors are zero, than the rotation matrix can not exist.
            if (IsZero (scale.x) || IsZero (scale.y) || IsZero (scale.z)) {
                rotation = Matrix4x4.identity;
                return false;
            }

            Vector3 at = new Vector3 (matrix.m20 / scale.z, matrix.m21 / scale.z, matrix.m22 / scale.z);
            Vector3 up = Vector3.Cross (at, new Vector3 (matrix.m00 / scale.x, matrix.m01 / scale.x, matrix.m02 / scale.x));
            Vector3 right = Vector3.Cross (up, at);

            rotation = Matrix4x4.identity;
            rotation.m00 = right.x;
            rotation.m01 = right.y;
            rotation.m02 = right.z;

            rotation.m10 = up.x;
            rotation.m11 = up.y;
            rotation.m12 = up.z;

            rotation.m20 = at.x;
            rotation.m21 = at.y;
            rotation.m22 = at.z;

            // In case of reflexions
            scale.x = Vector3.Dot (right, new Vector3 (matrix.m00, matrix.m01, matrix.m02)) > 0.0f ? scale.x : -scale.x;
            scale.y = Vector3.Dot (up, new Vector3 (matrix.m10, matrix.m11, matrix.m12)) > 0.0f ? scale.y : -scale.y;
            scale.z = Vector3.Dot (at, new Vector3 (matrix.m20, matrix.m21, matrix.m22)) > 0.0f ? scale.z : -scale.z;

            return true;
        }

        public static void RotationMatrix (Matrix4x4 matrix, out Quaternion result) {
            float sqrt;
            float half;
            float scale = matrix.m00 + matrix.m11 + matrix.m22;

            if (scale > 0.0f) {
                sqrt = (float) Math.Sqrt (scale + 1.0f);
                result.w = sqrt * 0.5f;
                sqrt = 0.5f / sqrt;

                result.x = (matrix.m12 - matrix.m21) * sqrt;
                result.y = (matrix.m20 - matrix.m02) * sqrt;
                result.z = (matrix.m01 - matrix.m10) * sqrt;
            } else if ((matrix.m00 >= matrix.m11) && (matrix.m00 >= matrix.m22)) {
                sqrt = (float) Math.Sqrt (1.0f + matrix.m00 - matrix.m11 - matrix.m22);
                half = 0.5f / sqrt;

                result.x = 0.5f * sqrt;
                result.y = (matrix.m01 + matrix.m10) * half;
                result.z = (matrix.m02 + matrix.m20) * half;
                result.w = (matrix.m12 - matrix.m21) * half;
            } else if (matrix.m11 > matrix.m22) {
                sqrt = (float) Math.Sqrt (1.0f + matrix.m11 - matrix.m00 - matrix.m22);
                half = 0.5f / sqrt;

                result.x = (matrix.m10 + matrix.m01) * half;
                result.y = 0.5f * sqrt;
                result.z = (matrix.m21 + matrix.m12) * half;
                result.w = (matrix.m20 - matrix.m02) * half;
            } else {
                sqrt = (float) Math.Sqrt (1.0f + matrix.m22 - matrix.m00 - matrix.m11);
                half = 0.5f / sqrt;

                result.x = (matrix.m20 + matrix.m02) * half;
                result.y = (matrix.m21 + matrix.m12) * half;
                result.z = 0.5f * sqrt;
                result.w = (matrix.m01 - matrix.m10) * half;
            }
        }

        public static bool IsZero (float a) {
            return Math.Abs (a) < 1e-6f;
        }

        public static bool isSimilar (float a, float b) {
            return a - b <= 0.001;
        }

        public static float Interpolate (float startX, float endX, float start, float end, float tanPoint1, float tanPoint2, float t, out float tangent) {
            // Catmull-Rom splines are Hermite curves with special tangent values.
            // Hermite curve formula:
            // (2t^3 - 3t^2 + 1) * p0 + (t^3 - 2t^2 + t) * m0 + (-2t^3 + 3t^2) * p1 + (t^3 - t^2) * m1
            // For points p0 and p1 passing through points m0 and m1 interpolated over t = [0, 1]
            // Tangent M[k] = (P[k+1] - P[k-1]) / 2
            // With [] indicating subscript
            float value = (2.0f * t * t * t - 3.0f * t * t + 1.0f) * start +
                (t * t * t - 2.0f * t * t + t) * tanPoint1 +
                (-2.0f * t * t * t + 3.0f * t * t) * end +
                (t * t * t - t * t) * tanPoint2;

            // Calculate tangents
            // p'(t) = (6t² - 6t)p0 + (3t² - 4t + 1)m0 + (-6t² + 6t)p1 + (3t² - 2t)m1
            tangent = (6 * t * t - 6 * t) * start +
                (3 * t * t - 4 * t + 1) * tanPoint1 +
                (-6 * t * t + 6 * t) * end +
                (3 * t * t - 2 * t) * tanPoint2;

            tangent /= (endX - startX);

            return value;
        }

    }
}