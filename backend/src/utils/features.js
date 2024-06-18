export class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.query
      ? {
          $or: [
            {
              title: {
                $regex: String(this.queryStr.query), // Ensure query is a string
                $options: "i", // Case-insensitive search
              },
            },
            {
              description: {
                $regex: String(this.queryStr.query), // Ensure query is a string
                $options: "i", // Case-insensitive search
              },
            },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit", "sortBy", "sortType"];

    removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy;
      const sortType = this.queryStr.sortType === "desc" ? -1 : 1;
      this.query = this.query.sort({ [sortBy]: sortType });
    }
    return this;
  }

    pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = currentPage === 1 ? 0 : resultPerPage * (currentPage - 2) + 6;
    const limit = currentPage === 1 ? 6 : resultPerPage;

    this.query = this.query.limit(limit).skip(skip);

    return this;
  }
}
