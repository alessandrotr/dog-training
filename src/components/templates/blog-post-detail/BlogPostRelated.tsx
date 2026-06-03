import Carousel from '@/components/Carousel'
import ArticleCard from '@/components/cards/ArticleCard'
import ServiceCard from '@/components/cards/ServiceCard'
import type { BlogPost, ServiceItem } from '@/types'

// Cross-sell: related programs + related articles carousels.
export default function BlogPostRelated({
  relatedServices,
  relatedPosts,
  caseStudyCounts,
  guideCounts,
  catLabel,
}: {
  relatedServices: ServiceItem[]
  relatedPosts: BlogPost[]
  caseStudyCounts: Map<string, number>
  guideCounts: Map<string, number>
  catLabel: (c: string) => string
}) {
  return (
    <>
      {relatedServices.length > 0 && (
        <div className="pt-8">
          <Carousel
            items={relatedServices}
            getKey={(s) => s.id}
            size="sm"
            label="programs"
            headline="Related programs"
            renderItem={(svc, slideProps) => (
              <ServiceCard
                svc={svc}
                caseStudies={caseStudyCounts.get(svc.id) ?? 0}
                guides={guideCounts.get(svc.id) ?? 0}
                slideProps={slideProps}
              />
            )}
          />
        </div>
      )}

      {relatedPosts.length > 0 && (
        <div className="pt-8">
          <Carousel
            items={relatedPosts}
            getKey={(p) => p.id}
            size="sm"
            label="articles"
            headline="Related Articles"
            renderItem={(rel, slideProps) => (
              <ArticleCard post={rel} slideProps={slideProps} categoryLabel={catLabel} />
            )}
          />
        </div>
      )}
    </>
  )
}
