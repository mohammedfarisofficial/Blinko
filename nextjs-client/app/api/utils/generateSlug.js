import slugify from "slugify";

const generateUniqueSlug = async (Model, title) => {
  try {
    let baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await Model.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  } catch (error) {
    console.error("Error generating unique slug:", error);
    throw new Error("Error generating unique slug");
  }
};

export { generateUniqueSlug };
