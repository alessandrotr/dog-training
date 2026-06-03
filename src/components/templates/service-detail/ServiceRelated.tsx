import Carousel from '@/components/Carousel'
import ServiceCard from '@/components/cards/ServiceCard'
import ArticleCard from '@/components/cards/ArticleCard'
import CaseStudyCard from '@/components/cards/CaseStudyCard'
import type { ServiceDetailViewModel } from './use-service-detail'

type ServiceRelatedProps = Pick<
  ServiceDetailViewModel,
  'caseStudies' | 'articles' | 'relatedServices' | 'caseStudyCounts' | 'guideCounts'
>

// The three cross-sell carousels: case studies, related articles, other programs.
export default function ServiceRelated({
  caseStudies,
  articles,
  relatedServices,
  caseStudyCounts,
  guideCounts,
}: ServiceRelatedProps) {
  return (
    <>
      {caseStudies.length > 0 && (
        <div className="pt-12 lg:pt-8">
          <Carousel
            items={caseStudies}
            getKey={(s) => s.id}
            size="sm"
            label="case studies"
            headline="Case studies from this service"
            renderItem={(s, slideProps) => <CaseStudyCard story={s} slideProps={slideProps} />}
          />
        </div>
      )}

      {articles.length > 0 && (
        <div className="pt-12 lg:pt-8">
          <Carousel
            items={articles}
            getKey={(p) => p.id}
            size="sm"
            label="articles"
            headline="Articles about this service"
            renderItem={(post, slideProps) => <ArticleCard post={post} slideProps={slideProps} />}
          />
        </div>
      )}

      {relatedServices.length > 0 && (
        <div className="pt-12 lg:pt-8">
          <Carousel
            items={relatedServices}
            getKey={(s) => s.id}
            size="sm"
            label="programs"
            headline="Other services"
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
    </>
  )
}
