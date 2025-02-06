import React, { useState } from "react";

abstract class Coordinates {
  abstract getX(): number;
  abstract getY(): number;
  abstract getRho(): number;
  abstract getTheta(): number;

  static createPoint(type: string, value1: number, value2: number): Coordinates {
    if (type.toUpperCase() === 'C') {
      return new CartesianCoords(value1, value2);
    } else if (type.toUpperCase() === 'P') {
      return new PolarCoords(value1, value2);
    } else {
      throw new Error("Invalid type: Use 'C' for Cartesian or 'P' for Polar");
    }
  }

  getDistance(pointB: Coordinates): number {
    const deltaX = this.getX() - pointB.getX();
    const deltaY = this.getY() - pointB.getY();
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }

  rotatePoint(rotation: number): Coordinates {
    const radRotation = (Math.PI / 180) * rotation;
    const X = this.getX();
    const Y = this.getY();
    return new CartesianCoords(
      Math.cos(radRotation) * X - Math.sin(radRotation) * Y,
      Math.sin(radRotation) * X + Math.cos(radRotation) * Y
    );
  }

  abstract convertStorageToPolar(): void;
  abstract convertStorageToCartesian(): void;
  abstract toString(): string;
}

class CartesianCoords extends Coordinates {
  private x: number;
  private y: number;
  private flag: boolean = false;

  constructor(X: number, Y: number) {
    super();
    this.x = X;
    this.y = Y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getRho(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  getTheta(): number {
    return (180 / Math.PI) * Math.atan2(this.y, this.x);
  }

  convertStorageToPolar(): void {
    this.flag = true;
  }

  convertStorageToCartesian(): void {
    this.flag = false;
  }

  toString(): string {
    return this.flag
      ? `Polar [Rho: ${this.getRho()}, Theta: ${this.getTheta()}]`
      : `Cartesian [X: ${this.x}, Y: ${this.y}]`;
  }
}

class PolarCoords extends Coordinates {
  private rho: number;
  private theta: number;
  private flag: boolean = false;

  constructor(Rho: number, Theta: number) {
    super();
    this.rho = Rho;
    this.theta = Theta;
  }

  getX(): number {
    return Math.cos((Math.PI / 180) * this.theta) * this.rho;
  }

  getY(): number {
    return Math.sin((Math.PI / 180) * this.theta) * this.rho;
  }

  getRho(): number {
    return this.rho;
  }

  getTheta(): number {
    return this.theta;
  }

  convertStorageToPolar(): void {
    this.flag = false;
  }

  convertStorageToCartesian(): void {
    this.flag = true;
  }

  toString(): string {
    return this.flag
      ? `Cartesian [X: ${this.getX()}, Y: ${this.getY()}]`
      : `Polar [Rho: ${this.rho}, Theta: ${this.theta}]`;
  }
}

export default function CoordinateForm() {
  const [cartesian, setCartesian] = useState({ x: "", y: "" });
  const [polar, setPolar] = useState({ rho: "", theta: "" });

  const handleCartesianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedCartesian = { ...cartesian, [name]: value };
    setCartesian(updatedCartesian);

    const x = parseFloat(updatedCartesian.x);
    const y = parseFloat(updatedCartesian.y);
    if (!isNaN(x) && !isNaN(y)) {
      const point = new CartesianCoords(x, y);
      setPolar({ rho: point.getRho().toFixed(2), theta: point.getTheta().toFixed(2) });
    }
  };

  const handlePolarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedPolar = { ...polar, [name]: value };
    setPolar(updatedPolar);

    const rho = parseFloat(updatedPolar.rho);
    const theta = parseFloat(updatedPolar.theta);
    if (!isNaN(rho) && !isNaN(theta)) {
      const point = new PolarCoords(rho, theta);
      setCartesian({ x: point.getX().toFixed(2), y: point.getY().toFixed(2) });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-200 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-black">Coordinate Converter</h2>

      {/* Cartesian Coordinates */}
      <div className="mb-4 flex items-center">
        <label className="w-24 text-lg font-semibold mr-2 text-black">X:</label>
        <input
          type="number"
          name="x"
          placeholder="X"
          value={cartesian.x}
          onChange={handleCartesianChange}
          className="border p-2 mr-2 text-black w-full"
        />
        <label className="w-24 text-lg font-semibold mr-2 text-black">Y:</label>
        <input
          type="number"
          name="y"
          placeholder="Y"
          value={cartesian.y}
          onChange={handleCartesianChange}
          className="border p-2 text-black w-full"
        />
      </div>

      {/* Polar Coordinates */}
      <div className="mb-4 flex items-center">
        <label className="w-24 text-lg font-semibold mr-2 text-black">Rho:</label>
        <input
          type="number"
          name="rho"
          placeholder="Rho"
          value={polar.rho}
          onChange={handlePolarChange}
          className="border p-2 mr-2 text-black w-full"
        />
        <label className="w-24 text-lg font-semibold mr-2 text-black">Theta:</label>
        <input
          type="number"
          name="theta"
          placeholder="Theta"
          value={polar.theta}
          onChange={handlePolarChange}
          className="border p-2 text-black w-full"
        />
      </div>
    </div>
  );
}
