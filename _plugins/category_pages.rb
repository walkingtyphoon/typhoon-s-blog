module Jekyll
  class CategoryPagesGenerator < Generator
    priority :low
    def generate(site)
      site.categories.keys.each do |cat|
        dir = File.join("categories", cat)
        disk = File.join(site.source, dir, "index.html")
        next if File.exist?(disk)
        page = PageWithoutAFile.new(site, site.source, dir, "index.html")
        page.data["layout"] = "category"
        page.data["title"] = "分类：#{cat}"
        page.data["category"] = cat
        page.data["permalink"] = "/categories/#{cat}/"
        site.pages << page
      end
    end
  end
end

