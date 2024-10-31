-- CreateTable
CREATE TABLE "Superheroes" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "originDescription" TEXT,
    "catchPhrase" TEXT,

    CONSTRAINT "Superheroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superpowers" (
    "id" SERIAL NOT NULL,
    "power_name" TEXT NOT NULL,

    CONSTRAINT "Superpowers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superhero_Superpowers" (
    "superheroId" INTEGER NOT NULL,
    "superpowerId" INTEGER NOT NULL,

    CONSTRAINT "Superhero_Superpowers_pkey" PRIMARY KEY ("superheroId","superpowerId")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "image_data" BYTEA NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image_Heroes" (
    "superheroId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "Image_Heroes_pkey" PRIMARY KEY ("superheroId","imageId")
);

-- AddForeignKey
ALTER TABLE "Superhero_Superpowers" ADD CONSTRAINT "Superhero_Superpowers_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superheroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Superhero_Superpowers" ADD CONSTRAINT "Superhero_Superpowers_superpowerId_fkey" FOREIGN KEY ("superpowerId") REFERENCES "Superpowers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Heroes" ADD CONSTRAINT "Image_Heroes_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superheroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Heroes" ADD CONSTRAINT "Image_Heroes_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
