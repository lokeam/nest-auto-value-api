import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2080)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
