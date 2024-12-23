class GeometryCalculator {
  // - Tính diện tích hình tròn.
  static circleArea(radius: number): number {
    return Math.PI * Math.pow(radius, 2);
  }

  // - Tính chu vi hình tròn.
  static circlePerimeter(radius: number): number {
    return Math.PI * radius * 2;
  }

  // - Tính diện tích hình tam giác.
  static triangleArea(base: number, height: number): number {
    return (base * height) / 2;
  }

  // - Tính chu vi tam giác.
  static trianglePerimeter(a: number, b: number, c: number): number {
    return a + b + c;
  }

  // - Tính diện tích hình chữ nhật.
  static rectangleArea(width: number, height: number): number {
    return width * height;
  }

  // - Tính chu vi hình chữ nhật.
  static rectanglePerimeter(width: number, height: number): number {
    return (width + height) * 2;
  }

  // - Tính diện tích hình bình hành.
  static parallelogramArea(base: number, height: number): number {
    return base * height;
  }

  // - Tính chu vi hình bình hành.
  static parallelogramPerimeter(a: number, b: number): number {
    return (a + b) * 2;
  }

  // - Tính diện tích hình thoi.
  static rhombusArea(d1: number, d2: number): number {
    return (d1 * d2) / 2;
  }

  // - Tính chu vi hình thoi.
  static rhombusPerimeter(side: number): number {
    return side * 4;
  }
}

enum GeoInput {circ = 1, tri, rec, pal, rhom, end}

class GeoMain {
  run(): void {
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${GeoInput.circ}. Tính diện tích và chu vi hình tròn.\n` +
        `${GeoInput.tri}. Tính diện tích và chu vi hình tam giác.\n` +
        `${GeoInput.rec}. Tính diện tích và chu vi hình chữ nhật.\n` +
        `${GeoInput.pal}. Tính diện tích và chu vi hình bình hành.\n` +
        `${GeoInput.rhom}. Tính diện tích và chu vi hình thoi.\n` +
        `${GeoInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case GeoInput.circ:
          const rad = Number(prompt('Enter circle radius'));
          if (isNaN(rad)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(`Perimeter: ${GeometryCalculator.circlePerimeter(rad)}, Area: ${GeometryCalculator.circleArea(rad)}`);
          break;
        case GeoInput.tri:
          const side1 = Number(prompt('Enter first side')); // used for height
          const side2 = Number(prompt('Enter second side'));
          const side3 = Number(prompt('Enter third side')); // as base
          if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          const triHeight = (0.5 / side3) * Math.sqrt(side1 + side2 + side3)
                            * Math.sqrt(-side1 + side2 + side3)
                            * Math.sqrt(side1 - side2 + side3)
                            * Math.sqrt(side1 + side2 - side3);

          console.log(
            `Perimeter: ${GeometryCalculator.trianglePerimeter(side1, side2, side3)},` +
            `Area: ${GeometryCalculator.triangleArea(triHeight, side3)}`,
          );
          break;
        case GeoInput.rec:
          const width = Number(prompt('Enter width'));
          const height = Number(prompt('Enter height'));
          if (isNaN(height) || isNaN(width)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(
            `Perimeter: ${GeometryCalculator.rectanglePerimeter(width, height)},` +
            `Area: ${GeometryCalculator.rectangleArea(width, height)}`,
          );
          break;
        case GeoInput.pal:
          const long = Number(prompt('Enter long side'));
          const short = Number(prompt('Enter short side'));
          if (isNaN(long) || isNaN(short)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(
            `Perimeter: ${GeometryCalculator.parallelogramPerimeter(long, short)},` +
            `Area: ${GeometryCalculator.parallelogramArea(long, short)}`,
          );
          break;
        case GeoInput.rhom:
          const side = Number(prompt('Enter side'));
          console.log(
            `Perimeter: ${GeometryCalculator.rhombusPerimeter(side)},` +
            `Area: ${GeometryCalculator.rhombusArea(side, side)}`,
          );
          break;
        case GeoInput.end:
          return;
      }
    }
  }
}

const geoApp = new GeoMain();
