import {scale as matterScale, verticalScale as matterVerticalScale, moderateScale as matterModerateScale} from "react-native-size-matters";

// Note

// scaledResult = origin / factor

// verticalScaleFactor: 0.94117647058823525
// moderateScaleFactor: 1.0142857142857142307692307692308
// scaleFactor (Horizontal): 1.0285714285714284615384615384615

// Example: origin = 15, want to scale by vertical
// => verticalScale( 15 / 0.94117647058823525 )

class ScaleUtils {

    static scale = (size) => matterScale(size);
    static verticalScale = (size) => matterVerticalScale(size);
    static moderateScale = (size, factor = 0.5) => matterModerateScale(size, factor);

    static floorScale = (size) => Math.floor(matterScale(size));
    static floorVerticalScale = (size) => Math.floor(matterVerticalScale(size));
    static floorModerateScale = (size, factor = 0.5) => Math.floor(matterModerateScale(size, factor));
                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

export default ScaleUtils;